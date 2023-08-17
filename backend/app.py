from flask import Flask, request, jsonify
from flask_cors import CORS

from utilities import check_content, read_pdf

app = Flask(__name__)
CORS(app)


@app.route('/detect', methods=['POST'])
def detect():
    content = request.get_json(cache=True)
    output = check_content(content['data'])
        
    return jsonify(output), 201