import { useState } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

import './App.css';
import { URL } from '../../settings';
import detectAIGenerated from '../../services/detect.services';

function App() {
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [label, setLabel] = useState('');
  const [score, setScore] = useState('');
  const navigate = useNavigate();

  const onClickSubmit = async () => {
    if (text) {
      const result = await detectAIGenerated(text);
      setScore(result['data']['result']['score']);
      setLabel(result['data']['result']['label']);
    }
  };

  const handleFileChange = (e) => {
    // setFile(e.target.files[0]);
    // setText('');
    // document.getElementById('inputGroupTextArea01').value = '';
    const files = e.target.files[0];
    navigate('/report', { state: files });
  };

  const handleTextAreaChange = (e) => {
    const textValue = e.target.value;
    const wordLength = textValue.split(' ').length;
    if (wordLength <= 500) {
      setText(e.target.value);
      setFile();
      document.getElementById('inputGroupFile01').value = '';
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mb-3">GPT2 Content Detector</h1>
        <div className="form-input">
          <div className="input-group mb-3">
            <textarea
              id="inputGroupTextArea01"
              onChange={handleTextAreaChange}
              className="form-control input-text"
              aria-label="With textarea"
              placeholder="Enter your text(500 words)"
            ></textarea>
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
          <h4 className="text-center mb-3">Or</h4>

          <div className="input-group mb-3">
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control"
              id="inputGroupFile01"
            />
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
