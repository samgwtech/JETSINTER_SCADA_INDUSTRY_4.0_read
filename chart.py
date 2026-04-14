import requests
import csv
import time
import base64
import struct
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
import json
import re
from collections import defaultdict

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

load_dotenv()

# InfluxDB setup
INFLUXDB_URL    = os.getenv("INFLUXDB_URL",    "http://localhost:8086")
INFLUXDB_TOKEN  = os.getenv("INFLUXDB_TOKEN",  "")
INFLUXDB_ORG    = os.getenv("INFLUXDB_ORG",    "jetsinter")
INFLUXDB_BUCKET = os.getenv("INFLUXDB_BUCKET", "measurements")
MACHINE_ID      = os.getenv("MACHINE_ID",      "machine_01")

INFLUX_FIELDS = {
    "temperature":     ("TEMP_C",        float),
    "mw_power":        ("PWM_PERCENT",   float),
    "elapsed_minutes": ("MINUTI_TOTALI", float),
    "machine_state":   ("START",         int),
    "fase":            ("FASE",          int),
    "t_target":        ("T_TARGET",      float),
}

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

IP_TO_BE_USED = os.getenv("IP_ADDRESS", ips_json["use"])
APIKEY = os.getenv("API_SECRET_KEY", "your_api_key_here")
DURATION_OF_MEASUREMENT = 25 * 60  # seconds

sleep_interval = 1

# -----------------------------------------------------------------------
# GET URLs
# -----------------------------------------------------------------------
GET_URL_1 = "https://192.168.151.100/api/get/data?elm=M(1)+M(2)+MB(200,200)+MD(201,214)"
GET_URL_2 = "https://192.168.151.100/api/get/data?elm=MD(220,247)"

# -----------------------------------------------------------------------
# Decoder base64 -> {indice: valore}
# -----------------------------------------------------------------------
def decode_range(b64_str: str, typ: str, start: int, end: int) -> dict:
    raw   = base64.b64decode(b64_str)
    count = end - start + 1
    result = {}
    if typ == "M":
        for i in range(count):
            result[start + i] = (raw[i // 8] >> (i % 8)) & 1
    elif typ == "MB":
        for i in range(count):
            result[start + i] = raw[i]
    elif typ in ("MD", "IA"):
        for i in range(count):
            result[start + i] = struct.unpack_from('<i', raw, i * 4)[0]
    return result

def _parse_range(range_item: dict, typ: str, addr_to_name: dict, readings: dict):
    if "V" not in range_item:
        print(f"  -> Skipping {typ}({range_item.get('START')},{range_item.get('END')}) - ERROR:{range_item.get('ERROR')}")
        return
    start  = range_item["START"]
    end    = range_item["END"]
    values = decode_range(range_item["V"], typ, start, end)
    for idx, val in values.items():
        name = addr_to_name.get((typ, idx))
        if name:
            readings[name] = val
            print(f"========= {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} -> {name} = {val}")

# -----------------------------------------------------------------------
# Mappa inversa (tipo, indice) -> nome variabile — calcolata una volta
# -----------------------------------------------------------------------
addr_to_name = {}
for group in plc_addresses_json.values():
    if not isinstance(group, dict):
        continue
    for var_name, addr in group.items():
        mr = re.match(r'^([A-Za-z]+)(\d+)$', addr)
        if mr:
            addr_to_name[(mr.group(1).upper(), int(mr.group(2)))] = var_name

# -----------------------------------------------------------------------
# CSV setup
# -----------------------------------------------------------------------
start_time = datetime.now()
file_name  = start_time.strftime("csv/%Y-%m-%d_%H-%M-%S_ZIRCONIA_SINTERIZATION.csv")

with open(file_name, mode='w', newline='') as file:
    writer = csv.writer(file)
    # CSV header
    writer.writerow([
        "START",
        "ELAPSED_MINUTES",
        "FASE",
        "TEMP_C",
        "T_INI",
        "T_FIN",
        "VELOCITA_NECESSARIA",
        "SOSTA_MIN",
    ])

with open("csv/LATEST.txt", mode='w') as f:
    f.write(file_name)

# -----------------------------------------------------------------------
# Session — riusa connessione TCP (keep-alive), calcolata una volta
# -----------------------------------------------------------------------
session = requests.Session()
session.verify = False
session.headers.update({'Authorization': f"Bearer {APIKEY}"})

# -----------------------------------------------------------------------
# Main loop
# -----------------------------------------------------------------------
while (datetime.now() - start_time).total_seconds() < DURATION_OF_MEASUREMENT:
    current_datetime = datetime.now()
    current_time_str = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

    try:
        print("==========================================================================")
        print("========= API REQUEST")
        print("=========", GET_URL_1)
        print("=========", GET_URL_2)
        print(f"========= {current_time_str} -> Sending request to PLC...")
        print("==========================================================================")

        response1 = session.get(GET_URL_1, timeout=20)
        response2 = session.get(GET_URL_2, timeout=20)

        if response1.status_code == 200 and response2.status_code == 200:
            operands1 = response1.json().get("OPERANDS", {})
            operands2 = response2.json().get("OPERANDS", {})

            # Merge operands da entrambe le risposte
            merged = defaultdict(list)
            for op in [operands1, operands2]:
                for key, val in op.items():
                    merged[key].extend(val)

            # Parsing
            readings = {}
            for range_item in merged["MRANGE"]:  _parse_range(range_item, "M",  addr_to_name, readings)
            for range_item in merged["MBRANGE"]: _parse_range(range_item, "MB", addr_to_name, readings)
            for range_item in merged["MDRANGE"]: _parse_range(range_item, "MD", addr_to_name, readings)
            for range_item in merged["IARANGE"]: _parse_range(range_item, "IA", addr_to_name, readings)
            for item in merged["MSINGLE"]:
                idx  = item.get("INDEX")
                val  = item.get("V")
                name = addr_to_name.get(("M", idx))
                if name:
                    readings[name] = val
                    print(f"========= {current_time_str} -> {name} = {val}")

            print("==========================================================================")

            # CSV
            with open(file_name, mode='a', newline='') as file:
                writer = csv.writer(file)
                # CSV data row
                writer.writerow([
                    readings.get("START"),
                    readings.get("MINUTI_TOTALI"),
                    readings.get("FASE"),
                    readings.get("TEMP_C"),
                    readings.get("T_INI"),
                    readings.get("T_FIN"),
                    readings.get("VELOCITA_NECESSARIA"),
                    readings.get("SOSTA_MIN"),
                ])
            print(f"{current_time_str} -> Data logged to CSV successfully")

            # InfluxDB
            try:
                point = Point("machine_measurement").tag("machine_id", MACHINE_ID)
                for field_name, (var_name, cast) in INFLUX_FIELDS.items():
                    val = readings.get(var_name)
                    if val is not None:
                        point = point.field(field_name, cast(val))
                point = point.time(current_datetime.replace(tzinfo=timezone.utc), WritePrecision.S)

                write_api.write(bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, record=point)
                print(f"{current_time_str} -> Data written to InfluxDB (machine: {MACHINE_ID})")
            except Exception as influx_err:
                print(f"{current_time_str} -> InfluxDB write failed (CSV still saved): {influx_err}")

        else:
            print(f"{current_time_str} -> RESPONSE 1 -> HTTP {response1.status_code}: {response1.text}")
            print(f"{current_time_str} -> RESPONSE 2 -> HTTP {response2.status_code}: {response2.text}")

    except Exception as e:
        print(f"{current_time_str} -> Request failed: {e}")
        sleep_interval = 2

    time.sleep(sleep_interval)
    sleep_interval = 1

session.close()
influx_client.close()
print("Measurement loop complete!")