FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y sudo && \
    apt-get install -y wget &&\
    apt-get install -y gnupg &&\
    rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - && \
    apt-get update && \
    apt-get install --yes nodejs

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable

RUN apt-get install -y fonts-noto

COPY package.json ./
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
