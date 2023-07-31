FROM node:20.5.0-bookworm

WORKDIR /root/frontend

COPY frontend /root/frontend

RUN npm install
RUN npm install -g serve

CMD serve -s build