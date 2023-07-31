from flask import Flask, request, jsonify
from flask_cors import CORS

from utilities import check_content, read_pdf

app = Flask(__name__)
CORS(app)


@app.route('/detect', methods=['POST'])
def detect():
    type = request.form['type']
    
    if type == 'file':
        file = request.files['file']
        content = read_pdf(file)
    elif type == 'text':
        content = request.form['content']
    
    content = content[0:500]
    output = check_content(content)
        
    return jsonify(output), 201