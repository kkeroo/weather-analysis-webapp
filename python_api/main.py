import flask
from flask.json import jsonify
from flask_cors import CORS
from flask import request
from werkzeug.utils import secure_filename
import pandas as pd

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/', methods=["GET", "POST"])
def generiraj():
    response = jsonify(message="hi")
    datoteka = request.files['datoteka']
    df = pd.read_csv(datoteka)
    print(df)
    return response

if __name__ == '__main__':
    app.run()