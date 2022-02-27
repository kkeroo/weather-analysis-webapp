from os import environ
import os
import flask
from flask.json import jsonify
from flask_cors import CORS
from flask import request, send_file,render_template, send_from_directory
import pandas as pd
from generator import generate_excel_file, generated_files
import threading
import pandas as pd

app = flask.Flask(__name__, static_url_path='/', static_folder='./app_public/build')
#app.config["DEBUG"] = True
#CORS(app)

threads = list()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/check', methods=["GET"])
def check():
    fileId = request.args.get('fileId')
    threadId = request.args.get('threadId')
    if (len(generated_files) > 0):
        return jsonify(True)

    return jsonify(False)

@app.route('/get', methods=["GET"])
def get():
    fileId = request.args.get('fileId')
    #return send_file('{}.xlsx'.format(fileId))
    #return send_file(generated_files[0])
    gf = generated_files[0]
    generated_files.remove(gf)
    return flask.Response(gf, content_type='application/vnd.ms-excel')

file_counter = 0
editing_file = False
@app.route('/generate', methods=["POST"])
def generiraj():
    fileData = request.files['fileData']
    fileName = request.form['fileName']
    baseTemp = request.form['baseTemperature']
    startDate = request.form['startDate']
    endDate = request.form['endDate']
    tempGraph = request.form['temperatureGraph'] == 'true'
    rainGraph = request.form['rainGraph'] == 'true'
    dailyData = request.form['dailyData'] == 'true'
    monthlyData = request.form['monthlyData'] == 'true'
    print(bool(tempGraph), rainGraph, dailyData, monthlyData)

    df = pd.read_csv(fileData, sep=';')

    global file_counter
    file_counter = file_counter + 1
    print(file_counter)
    thread = threading.Thread(target=generate_excel_file, args=(df, file_counter, startDate, endDate, int(baseTemp), tempGraph, rainGraph, dailyData, monthlyData), daemon=True)
    thread.start()
    #generate_excel_file(datoteka, startDate, endDate, int(baseTemp), tempGraph, rainGraph, dailyData, monthlyData)
    threads.append(thread)
    #exfile = df.to_csv('file.csv')
    print(f"Thread is alive: {thread.is_alive()}")
    print(f"Thread: {thread}")
    return jsonify(fileName, thread.ident, file_counter)

if __name__ == '__main__':
    #app.run(debug=False, port=os.environ.get('PORT', 80))
    app.run()