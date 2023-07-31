from flask import Flask, request, jsonify
from flask_cors import CORS

from utilities import check_content, read_pdf

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def root():
    return jsonify("hi from the api-gpt2detect"), 201

@app.route('/detect', methods=['POST'])
def detect():
    print(f"{request=}")
    print(f"{request.form=}")
    print(f"{request.form['content']=}")
    type = request.form['type']
    
    if type == 'file':
        file = request.files['file']
        content = read_pdf(file)
    elif type == 'text':
        content = request.form['content']
    
    content = content[0:500]
    output = check_content(content)
        
    return jsonify(output), 201