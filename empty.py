#!/usr/bin/env python3

import pymongo
import json
import requests
import random
import os
import sys
import signal
import time
import string
import names
import pandas as pd
import subprocess as sp

import warnings
warnings.filterwarnings("ignore")

def empty_mongo(database, collections, host="localhost", port=27017):
    client = pymongo.MongoClient(host, port)
    db = client[database]
    for collection in collections:
        db.drop_collection(collection)
    return

headers = { "Content-type": "application/json" }

def login(url):
    global headers
    signup = url + "/signup"
    data = dict(
        username="admin",
        email="admin@admin",
        password="admin"
    )
    res = requests.post(
        signup,
        data=json.dumps(data),
        headers=headers,
        verify=False
    )
    print("Update user to admin in compass, then press enter...", end="")
    input()
    url += "/login"
    data = dict(
        username="admin",
        password="admin",
    )
    res = requests.post(
        url,
        headers=headers,
        data=json.dumps(data),
        verify=False
    )
    token = res.json()["token"]
    headers["x-observatory-auth"] = token

if __name__ == "__main__":
    empty_mongo("softeng",
                ["prices",
                 "shops",
                 "products",
                 "blacklists"])
    #  login("https://localhost:8765/observatory/api")
