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
RECIPE_VALUE  = os.getenv('RECIPE_VALUE', '0')
RECIPE_ADDRESS  = os.getenv('RECIPE_ADDRESS', '1')

APIKEY = os.getenv("API_SECRET_KEY", "your_api_key_here")

headers = {'Authorization': f"Bearer {APIKEY}"}
SET_REQUEST_URL = (f"https://{IP_TO_BE_USED}/api/set/op?op=MW&index={RECIPE_ADDRESS}&val={RECIPE_VALUE}")
print("Sending request to:", SET_REQUEST_URL)
response = requests.get(SET_REQUEST_URL, headers=headers, verify=False)
if response.status_code == 200:
   data = response.json()