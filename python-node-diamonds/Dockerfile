FROM python:alpine
WORKDIR /app

RUN echo "http://dl-8.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories
RUN apk --no-cache --update-cache add gcc gfortran python python-dev py-pip build-base wget freetype-dev libpng-dev openblas-dev nodejs npm
RUN apk --no-cache --update-cache add python3 python3-dev bash
COPY . .
RUN pip3 install numpy
RUN pip3 install pandas
RUN pip3 install joblib
##RUN pip install json
RUN pip3 install cython
RUN pip3 install sklearn
#
RUN npm install
CMD node server.js
#
EXPOSE 4000
