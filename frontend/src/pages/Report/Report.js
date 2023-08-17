import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import './Report.css';
import 'react-pdf/dist/Page/TextLayer.css';

import detectAIGenerated from '../../services/detect.services';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function Report() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const [file, setFile] = useState();
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    setFile(location.state);
  }, []);

  const onDocumentLoadSuccess = (obj) => {
    const { numPages } = obj;
    setNumPages(numPages);
    setPageNumber(1);
    //checkPDFPlagarism();
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const onCurrentPageChange = (event) => {
    const value = parseInt(event.target.value);
    if (value <= numPages) {
      setPageNumber(value);
    }
  };

  const processString = (text) => {
    let textItems = text.split('.');
    textItems = textItems.map((t) => {
      return t.replaceAll('\n', ' ').trim();
    });
    return textItems.filter((text) => text.split(' ').length > 3);
  };

  const checkPDFPlagarism = useCallback(async (items) => {
    // setLoading(true);
    const textItems = document.getElementsByClassName(
      'react-pdf__Page__textContent textLayer'
    )[0].innerText;

    let processedText = processString(textItems);
    const result = await detectAIGenerated(processedText);
    if (result) {
      markPlagarisedSentences(result['data']);
    }
  });

  const markPlagarisedSentences = (contents) => {
    const spanMarkup = document.getElementsByTagName('span');

    contents.map((content) => {
      if (content['result']['label'].toLowerCase() == 'fake') {
        const sentence = content['sentence'];
        for (let i = 0; i < spanMarkup.length; i++) {
          let innerText = spanMarkup[i].innerText;
          if (!innerText.trim()) {
            break;
          }
          let res = 0;
          if (innerText.length > sentence.length) {
            res = innerText.indexOf(sentence);
          } else {
            res = sentence.indexOf(innerText);
          }
          if (res > -1) {
            spanMarkup[i].innerHTML = `<mark>${innerText}</mark>`;
            break;
          }
        }
      }
    });
  };

  const downloadReport = () => {
    const input = document.getElementsByClassName(
      'react-pdf__Page__textContent textLayer'
    )[0];
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save('download.pdf');
    });
  };

  return (
    <div className="container-fluid">
      <div className="button-container">
        {/* <button
          className="btn btn-outline-primary my-2"
          onClick={downloadReport}
          type="button"
        >
          Generate Report
        </button> */}
        <p className="mt-2">
          Page: {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          className="btn btn-outline-secondary previous-btn"
          type="button"
          disabled={pageNumber <= 1 || isLoading}
          onClick={previousPage}
        >
          Previous
        </button>
        <input type="text" value={pageNumber} onChange={onCurrentPageChange} />
        <button
          className="btn btn-outline-secondary next-btn"
          type="button"
          disabled={pageNumber >= numPages || isLoading}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={false}
          onRenderTextLayerSuccess={checkPDFPlagarism}
        />
      </Document>
    </div>
  );
}

export default Report;
