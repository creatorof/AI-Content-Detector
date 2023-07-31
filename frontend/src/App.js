import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { URL } from './settings';

function App() {
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [label, setLabel] = useState('');
  const [score, setScore] = useState('');

  const onClickSubmit = () => {
    if (text || file) {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        formData.append('type', 'file');
        formData.append('fileName', file.name);
      } else {
        formData.append('content', text);
        formData.append('type', 'text');
      }

      const config = {
        headers: {
          'content-type': 'multipart/formdata',
        },
      };

      axios
        .post(URL, formData, config)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const result = response.data[0];
            setFile();
            setText('');
            setLabel(result.label);
            setScore(result.score * 100);
          }
        })
        .catch((response) => {
          console.log(response.data);
        });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setText('');
    document.getElementById('inputGroupTextArea01').value = '';
  };

  const handleTextAreaChange = (e) => {
    setText(e.target.value);
    setFile();
    document.getElementById('inputGroupFile01').value = '';
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mb-3">GPT2 Content Detector</h1>
        <div className="form-input">
          <div className="input-group">
            <textarea
              id="inputGroupTextArea01"
              onChange={handleTextAreaChange}
              className="form-control input-text"
              aria-label="With textarea"
              placeholder="Enter your text"
            ></textarea>
          </div>
          <h4 className="text-center mb-3">Or</h4>

          <div className="input-group mb-3">
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control"
              id="inputGroupFile01"
            />
          </div>
          <div className="input-group mb-3">
            <button
              type="button"
              className="text-center btn btn-lg btn-primary"
              onClick={onClickSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <h4>
            {label} {score}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default App;
