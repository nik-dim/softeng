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

def random_date(start, end, prop):
    format = "%Y-%m-%d"
    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))
    ptime = stime + prop * (etime - stime)
    return time.strftime(format, time.localtime(ptime))

def get_ids(url, name):
    params = {"count": 10000}
    ids = requests.get(url, params=params, headers=headers, verify=False)
    ids = ids.json()[name]
    return list(map(lambda x: x["_id"], ids))

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

def pass_gen(size=8, chars=string.ascii_letters + string.digits):
    return "".join(random.choices(chars, k=size))

def post(url, data):
    requests.post(
        url,
        data=json.dumps(data),
        headers=headers,
        verify=False,
    )

def fill_users(url):
    url += "/signup"
    DOMAINS = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "softlab.ntua.gr",
        "cslab.ntua.gr",
        "corelab.ntua.gr",
    ]
    MALE = 500
    FEMALE = 500
    USERS = []
    NAMES = []
    for _ in range(MALE):
        f, l = "", ""
        while True:
            f = names.get_first_name(gender="male")
            l = names.get_last_name()
            if (f, l) not in NAMES:
                break
        username = f"{f}{l}"
        email = f"{f}{l}@{random.choice(DOMAINS)}"
        password = pass_gen()
        USERS.append((f, l, email, username, password))
        NAMES.append((f, l))
    for _ in range(MALE):
        f, l = "", ""
        while True:
            f = names.get_first_name(gender="female")
            l = names.get_last_name()
            if (f, l) not in NAMES:
                break
        username = f"{f}{l}"
        email = f"{f}{l}@{random.choice(DOMAINS)}"
        password = pass_gen()
        USERS.append((f, l, email, username, password))
        NAMES.append((f, l))
    for user in USERS:
        post(
            url,
            dict(
                username=user[3],
                email=user[2],
                password=user[4],
            )
        )

def fill_shops(url, geojson):
    url += "/shops"
    tags = [f"shoptag{i}" for i in range(1, 11)]
    df = pd.read_csv(geojson, sep=",", header=0)
    length = df.shape[0]
    shoptags = []
    for _ in range(length):
        k = random.randint(1, 10)
        shoptags.append(random.sample(tags, k=k))
    df["tags"] = shoptags
    for _, r in df.iterrows():
        post(
            url,
            dict(
                name=r["name"],
                lng=r["lng"],
                lat=r["lat"],
                brand=r["brand"],
                tags=r["tags"],
                address=r["address"],
            )
        )

def fill_products(url):
    url += "/products"
    PRODUCTS = [
        "Unleaded",
        "Super Unleaded",
        "Diesel",
        "Gas",
        "Heating Oil",
        "Car Oils",
        "Firewood",
        "Charcoal",
        "Liquid Gas",
        "Windscreen Wipers",
        "Car Wash",
        "Car Wash Full",
        "Car Perfume",
        "Floor Mats",
        "Polishing Oitment",
        "Steering Wheel Cover",
        "Spark Plug",
        "Organic Cleaning",
        "Engine Cleaning",
        "Fire Extinguishers",
        "Triangle",
        "Car Pharmacy",
    ]
    DESCRIPTIONS = [
        "Car fuel with 95-97 octanes",
        "Car fuel with 100+ octanes",
        "Car fuel for diesel cars",
        "Car fuel for gas cars",
        "Low price usually, used for boilers",
        "Necessary so that the engine does not get stuck",
        "Wood used to keep a fire going in a fireplace",
        "Used primarily for roasting/barbecue",
        "For household usage, replaces electric stove",
        "Used when raining to wipe the front and back screen of car",
        "Wash the outside of the car",
        "Inside and outside car wash",
        "Liquid or paper used to make the inside of a car smell great",
        "Mats used in each of the cars' seats to protect the inside of the car from litter",
        "Used to polish the outside of the car",
        "Used to protect the steering wheel from wear and tear, also makes it more comfortable",
        "Device for delivering electric current from an ignition system to the combustion chamber of a spark-ignition engine to ignite the compressed fuel/air mixture by an electric spark, while containing combustion pressure within the engine",
        "Thorough car clean both inside and outside",
        "Clean the engine of the car from rust and dust",
        "Active fire protection device used to extinguish or control small fires, often in emergency situations",
        "Used to alert other drivers that a car is stopped",
        "Box containing main pharmaceutical products, used when having accidents"
    ]
    CATEGORIES = [
        "Car Fuel",
        "Car Fuel",
        "Car Fuel",
        "Car Fuel",
        "Boiler Fuel",
        "Car Essentials",
        "Home Usage",
        "Home Usage",
        "Home Usage",
        "Accessories",
        "Cleaning",
        "Cleaning",
        "Accessories",
        "Accessories",
        "Cleaning",
        "Accessories",
        "Car Essentials",
        "Cleaning",
        "Cleaning",
        "Car Essentials",
        "Car Essentials",
        "Car Essentials",
    ]
    TAGS = [
        ["Car", "Fuel", "Unleaded"],
        ["Car", "Fuel", "Unleaded"],
        ["Car", "Fuel", "Diesel", "Petrol"],
        ["Car", "Fuel", "Gas", "Tank"],
        ["Oil", "Petrol", "Heat", "Tank", "Home"],
        ["Car", "Oil", "Maintenance"],
        ["Wood", "Home", "Fire"],
        ["Fire", "Barbecue", "Home"],
        ["Stove", "Fire", "Tank"],
        ["Car", "Water"],
        ["Car", "Wash", "Water"],
        ["Car", "Wash", "Water", "Dry-Clean"],
        ["Car", "Perfume", "Aroma"],
        ["Car", "Mat", "Floor", "Inside"],
        ["Car", "Polish", "Wash"],
        ["Car", "Leather"],
        ["Car", "Spark"],
        ["Car", "Wash"],
        ["Car", "Maintenance"],
        ["Fire"],
        ["Car", "Accident"],
        ["Car", "Pharmacy", "Health"],
    ]
    for p, c, d, t in zip(PRODUCTS, CATEGORIES, DESCRIPTIONS, TAGS):
        post(
            url,
            dict(
                name=p,
                category=c,
                description=d,
                tags=t,
            )
    )

def fill_prices(url):
    users = get_ids(url, "users")
    shops = get_ids(url + "/shops", "shops")
    products = get_ids(url + "/products", "products")
    url += "/prices"
    for shop in shops:
        blacklist = []
        for _ in range(5):
            user = random.choice(users)
            product = 0
            while True:
                product = random.choice(products)
                if product not in blacklist:
                    blacklist.append(product)
                    break
            price = float(f"{random.uniform(0.5, 10.0):.2f}")
            dateFrom = random_date("2016-01-01", "2019-01-01", random.random())
            dateTo = random_date(dateFrom, "2019-02-01", random.random())
            post(
                url, 
                dict(
                    userId=user,
                    productId=product,
                    shopId=shop,
                    price=price,
                    dateFrom=dateFrom,
                    dateTo=dateTo,
                )
            )

def fill_backend(geojson, url="https://localhost:8765/observatory/api"):
    s1 = time.time()
    fill_users(url)
    print(f"Users time elapsed: {time.time() - s1:.4f}s")
    s2 = time.time()
    fill_shops(url, geojson)
    print(f"Shops elapsed: {time.time() - s2:.4f}s")
    s3 = time.time()
    fill_products(url)
    print(f"Products elapsed: {time.time() - s3:.4f}s")
    s4 = time.time()
    fill_prices(url)
    print(f"Prices elapsed: {time.time() - s4:.4f}s")

if __name__ == "__main__":
    empty_mongo("softeng",
                ["prices",
                 "shops",
                 "products",
                 "users",
                 "blacklists"])
    login("https://localhost:8765/observatory/api")
    start = time.time()
    fill_backend(os.path.abspath(sys.argv[1]))
    print(f"Time elapsed: {time.time() - start:.4f}s")
