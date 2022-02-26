import flask
from flask.json import jsonify
from flask_cors import CORS
from flask import request, send_file, send_from_directory
import pandas as pd
from generator import generate_excel_file

app = flask.Flask(__name__, static_url_path='', static_folder='app_public/build')
#app.config["DEBUG"] = True
#CORS(app)

@app.route('/', defaults={'path': ''})
def index(path):
    return 'hi'
    #return send_from_directory(app.static_folder, 'index.html')

@app.route('/get', methods=["GET"])
def get():
    return send_file('file.xlsx')

@app.route('/generate', methods=["POST"])
def generiraj():
    datoteka = request.files['fileData']
    fileName = request.form['fileName']
    baseTemp = request.form['baseTemperature']
    startDate = request.form['startDate']
    endDate = request.form['endDate']
    tempGraph = request.form['temperatureGraph'] == 'true'
    rainGraph = request.form['rainGraph'] == 'true'
    dailyData = request.form['dailyData'] == 'true'
    monthlyData = request.form['monthlyData'] == 'true'
    print(bool(tempGraph), rainGraph, dailyData, monthlyData)

    generate_excel_file(datoteka, startDate, endDate, int(baseTemp), tempGraph, rainGraph, dailyData, monthlyData)
    
    #exfile = df.to_csv('file.csv')
    return fileName

if __name__ == '__main__':
    app.run()