FROM rocker/r-apt:bionic
WORKDIR /app

RUN apt-get update
RUN apt-get install -y -qq curl
RUN apt-get install -y -qq gnupg-agent
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y -qq build-essential nodejs

COPY . .
RUN npm install
RUN R -e 'install.packages("tidyverse")'
RUN R -e 'install.packages("randomForest")'
RUN R -e 'install.packages("jsonlite")'

CMD node server.js

EXPOSE 4000
