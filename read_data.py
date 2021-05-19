#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 11 19:06:08 2021

@author: lucianos
"""
import os
import requests as rqt
import pandas as pd
import json

df = pd.read_csv("Datasets/ABoVE_ Boutin Alberta Grey Wolf.csv")
df_json = df.to_json(orient = "records")
uva = json.loads(df_json)
len(uva)

for i in range(332):
    sample = uva[i]
    
    body = {}
    
    body["specimenId"] = str(sample["tag-local-identifier"])
    body["latitude"] = sample["location-lat"]
    body["longitude"] = sample["location-long"]
    body["timestamp"] = sample["timestamp"]
    
        
    request = rqt.post("http://localhost:8000/api/createSpecimen", json = body)
    print(request.json())

