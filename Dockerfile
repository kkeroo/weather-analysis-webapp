FROM python:3.9

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /usr/src/app/requirements.txt

COPY . /usr/scr/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]