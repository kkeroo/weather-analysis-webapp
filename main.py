from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import pandas as pd
import os
from worker import generate
from redis import Redis
from rq import Queue, cancel_job
from rq.job import Job
from rq.command import send_stop_job_command
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis_conn = Redis(host="redis", port=6379, db=0)
q = Queue('my_queue', connection=redis_conn)

def split_date(date):
    date = date.split(" ")[0]
    date = date.split(".")
    day = date[0]
    month = date[1]
    year = date[2]
    return day, month, year

def create_date(day, month, year, date_format):
    if date_format == 'ymd':
        date = '20' + year + '-' + month + '-' + day
        return date
    date = day + '.' + month + '.' + '20' + year
    return date

def format_date(date):
    date = date.split('-')
    year = date[0]
    month = date[1]
    day = date[2]
    date = day + '/' + month + '/' + year
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
    starting_date = create_date(day, month, year, 'dmy')
    starting_date_ymd = create_date(day, month, year, 'ymd')

    #last date
    raw_date = df.iloc[-1,0]
    day, month, year = split_date(raw_date)
    ending_date = create_date(day, month, year, 'dmy')
    ending_date_ymd = create_date(day, month, year, 'ymd')

    return {
        "starting_date": starting_date,
        "ending_date": ending_date,
        "starting_date_ymd": starting_date_ymd,
        "ending_date_ymd": ending_date_ymd
    }

@app.post("/generate")
async def generate_file(base_temperature: str = Form(), starting_date: str = Form(), ending_date: str = Form(), file: UploadFile = File(...)):
    print(base_temperature, starting_date, ending_date, file.filename)
    df = pd.read_csv(file.file, sep=";")
    sd = format_date(starting_date)
    ed = format_date(ending_date)
    bt = int(base_temperature)
    job = q.enqueue(generate, args=(df, sd, ed, bt,))
    return {'job': job.id}

# @app.get("/generate")
# async def get_file():
#     headers = {'Content-Disposition': 'attachment; filename="Book.xlsx"'}
#     return FileResponse(path="weatherstation_export.xlsx", headers=headers)