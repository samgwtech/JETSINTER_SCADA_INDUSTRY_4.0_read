import requests
import csv
import time
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
import json

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

load_dotenv()  # Load environment variables from .env file

# InfluxDB setup
INFLUXDB_URL = os.getenv("INFLUXDB_URL", "http://localhost:8086")
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN", "")
INFLUXDB_ORG = os.getenv("INFLUXDB_ORG", "jetsinter")
INFLUXDB_BUCKET = os.getenv("INFLUXDB_BUCKET", "measurements")
MACHINE_ID = os.getenv("MACHINE_ID", "machine_01")

influx_client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
write_api = influx_client.write_api(write_options=SYNCHRONOUS)
try:
    with open("settings/plc_addresses.json") as f:
        plc_addresses_json = json.load(f)
except FileNotFoundError:
    print("Error: plc_addresses.json file not found.")
    exit(1)

with open("settings/ips.json") as f:
    ips_json = json.load(f)

#set IP_TO_BE_USED as IP_ADDRESS from .env
IP_TO_BE_USED = os.getenv("IP_ADDRESS", ips_json["use"])  # default to IP_PLC if not set

APIKEY = os.getenv("API_SECRET_KEY", "your_api_key_here")
DURATION_OF_MEASUREMENT = 25 * 60  # 25 minutes in seconds

sleep_interval = 1

GET_URL = (
    f"https://{IP_TO_BE_USED}/api/get/data?elm="
    f"M({plc_addresses_json['M_START_RED']})+"
    f"MW({plc_addresses_json['MW_MW_PERCENT_POWER_WRITE']})+"
    f"MW({plc_addresses_json['MW_MW_SCALED_FOR_PWM']})+"
    f"MW({plc_addresses_json['MW_TEMPERATURE']})+"
    f"MW({plc_addresses_json['MW_ELAPSED_SECONDS']})"
)

# Create a new timestamped CSV file for each run
start_time = datetime.now()
file_name = start_time.strftime("csv/%Y-%m-%d_%H-%M-%S_ZIRCONIA_SINTERIZATION.csv")

# Write CSV header
with open(file_name, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["ELAPSED SECONDS", "MACHINE_STATE", "TEMPERATURE", "MW_POWER"])

# Save the current file name so the frontend can find it
with open("csv/LATEST.txt", mode='w') as f:
    f.write(file_name)

# Start the measurement loop using dynamic sleep intervals
while (datetime.now() - start_time).total_seconds() < DURATION_OF_MEASUREMENT:
    current_datetime = datetime.now()
    current_time_str = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    headers = {'Authorization': f"Bearer {APIKEY}"}

    try:
        ##create fancy print of GET_URL and current time
        print("==========================================================================")
        print("========= API REQUEST ")
        print("=========", GET_URL)
        print(f"========= {current_time_str} -> Sending request to PLC...")
        print("==========================================================================")
        response = requests.get(GET_URL, headers=headers, verify=False)
        if response.status_code == 200:
            data = response.json()
            # Retrieve MW measurements from MWSINGLE and M measurements from MSINGLE
            mw_measurements = data.get("OPERANDS", {}).get("MWSINGLE", [])
            m_measurements = data.get("OPERANDS", {}).get("MSINGLE", [])

            m_start_read = None;
            mw_temperature = None;
            mw_mw_percent_power_write = None;
            mw_elapsed_seconds = None;

            for m in m_measurements:
                idx = m.get("INDEX")
                value = m.get("V")
                if idx == plc_addresses_json["M_START_RED"]:
                    if (value == 1):
                        print(f"========= {current_time_str} -> Machine START detected.")
                    else:
                        print(f"========= {current_time_str} -> Machine STOP detected.")
                    m_start_read = value
                    print(f"========= {current_time_str} -> Valore Start: {m_start_read}")

            for mw in mw_measurements:
                idx = mw.get("INDEX")
                value = mw.get("V")
                if idx == plc_addresses_json["MW_TEMPERATURE"]:
                    mw_temperature = value
                    print(f"========= {current_time_str} -> Valore Temperatura: {mw_temperature} °C")
                elif idx == plc_addresses_json["MW_MW_PERCENT_POWER_WRITE"]:
                    mw_mw_percent_power_write = value
                    print(f"========= {current_time_str} -> Valore Potenza: {mw_mw_percent_power_write} %")
                elif idx == plc_addresses_json["MW_MW_SCALED_FOR_PWM"]:
                    mw_mw_scaled_for_pwm = value
                    print(f"========= {current_time_str} -> Valore scalatura potenza PWM: {mw_mw_scaled_for_pwm}")
                elif idx == plc_addresses_json["MW_ELAPSED_SECONDS"]:
                    mw_elapsed_seconds = value
                    print(f"========= {current_time_str} -> Valore Elapsed Seconds: {mw_elapsed_seconds} s")
            print("==========================================================================")

            with open(file_name, mode='a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([
                    mw_elapsed_seconds, m_start_read, mw_temperature, mw_mw_percent_power_write
                ])
            print(f"{current_time_str} -> Data logged to CSV successfully ")

            # Write to InfluxDB
            try:
                point = (
                    Point("machine_measurement")
                    .tag("machine_id", MACHINE_ID)
                    .field("temperature", float(mw_temperature) if mw_temperature is not None else None)
                    .field("mw_power", float(mw_mw_percent_power_write) if mw_mw_percent_power_write is not None else None)
                    .field("elapsed_seconds", float(mw_elapsed_seconds) if mw_elapsed_seconds is not None else None)
                    .field("machine_state", int(m_start_read) if m_start_read is not None else None)
                    .time(current_datetime.replace(tzinfo=timezone.utc), WritePrecision.SECONDS)
                )
                write_api.write(bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, record=point)
                print(f"{current_time_str} -> Data written to InfluxDB (machine: {MACHINE_ID})")
            except Exception as influx_err:
                print(f"{current_time_str} -> InfluxDB write failed (CSV still saved): {influx_err}")

    except Exception as e:
        print(f"{current_time_str} -> Request failed: {e}")
        sleep_interval = 2  # fallback sleep on exception

    time.sleep(sleep_interval)

influx_client.close()
print("Measurement loop complete! ")
