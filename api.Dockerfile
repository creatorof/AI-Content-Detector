FROM python:3.10.6

WORKDIR /root/backend

RUN pip3 install blinker==1.6.2
RUN pip3 install certifi==2023.7.22
RUN pip3 install charset-normalizer==3.2.0
RUN pip3 install click==8.1.6
RUN pip3 install colorama==0.4.6
RUN pip3 install filelock==3.12.2
RUN pip3 install Flask==2.3.2
RUN pip3 install Flask-Cors==4.0.0
RUN pip3 install fsspec==2023.6.0
RUN pip3 install huggingface-hub==0.16.4
RUN pip3 install idna==3.4
RUN pip3 install importlib-metadata==6.8.0
RUN pip3 install itsdangerous==2.1.2
RUN pip3 install Jinja2==3.1.2
RUN pip3 install MarkupSafe==2.1.3
RUN pip3 install mpmath==1.3.0
RUN pip3 install networkx==3.1
RUN pip3 install numpy==1.24.4
RUN pip3 install packaging==23.1
RUN pip3 install pypdf2==3.0.1
RUN pip3 install PyYAML==6.0.1
RUN pip3 install regex==2023.6.3
RUN pip3 install requests==2.31.0
RUN pip3 install safetensors==0.3.1
RUN pip3 install sympy==1.12
RUN pip3 install tokenizers==0.13.3
RUN pip3 install torch==2.0.1
RUN pip3 install tqdm==4.65.0
RUN pip3 install transformers==4.31.0
RUN pip3 install typing-extensions==4.7.1
RUN pip3 install urllib3==2.0.4
RUN pip3 install Werkzeug==2.3.6
RUN pip3 install zipp==3.16.2

COPY backend /root/backend/

# CMD tail -f /dev/null
CMD flask --app app run --host=0.0.0.0 --port=80