FROM node:alpine as BUILD_IMAGE
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
