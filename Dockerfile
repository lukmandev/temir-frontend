FROM node:17-alpine3.14


WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

ENV PORT=3000

EXPOSE 3000

CMD [ "npm" , "start" ]