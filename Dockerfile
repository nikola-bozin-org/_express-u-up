FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 9876

RUN chmod +x ./run.sh

CMD ["./run.sh"]

