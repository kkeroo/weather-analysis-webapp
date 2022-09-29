from calendar import month
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def split_date(date):
    date = date.split(" ")[0]
    date = date.split(".")
    day = date[0]
    month = date[1]
    year = date[2]
    return day, month, year

def create_date(day, month, year):
    date = day + '.' + month + '.' + '20' + year
    return date

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/")
async def create_file(file: UploadFile = File(...)):
    _, ext = os.path.splitext(file.filename)
    if ext != ".csv":
        return {'error': 'Wrong file type.'}
    df = pd.read_csv(file.file, sep=';')

    # first date
    raw_date = df.iloc[0,0]
    day, month, year = split_date(raw_date)
    starting_date = create_date(day, month, year)

    #last date
    raw_date = df.iloc[-1,0]
    day, month, year = split_date(raw_date)
    ending_date = create_date(day, month, year)

    print(starting_date, ending_date)

    return {"starting_date": starting_date, "ending_date": ending_date}
