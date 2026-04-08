import requests
import csv
import time
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file
IP_SEVIO = "10.139.216.102"
IP_PLC = "192.168.151.102"

#set IP_TO_BE_USED as IP_ADDRESS from .env
IP_TO_BE_USED = os.getenv("IP_ADDRESS", IP_PLC)  # default to IP_PLC if not set

APIKEY = os.getenv("API_SECRET_KEY", "your_api_key_here")
START_BUTTON_ADDRESS  = "1"
headers = {'Authorization': f"Bearer {APIKEY}"}
SET_REQUEST_URL = (f"https://{IP_TO_BE_USED}/api/set/op?op=M&index={START_BUTTON_ADDRESS}&val=0")
print(f"Sending request to {SET_REQUEST_URL} with headers {headers}")
response = requests.get(SET_REQUEST_URL, headers=headers, verify=False)
print(f"Response status code: {response.status_code}")
if response.status_code == 200:
            data = response.json()