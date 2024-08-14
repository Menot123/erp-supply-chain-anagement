FROM node:14-alpine

EXPOSE 3000

WORKDIR /felix/api-gateway

COPY package*.json ./

RUN npm i

RUN npm install -g @babel/core @babel/cli

COPY . .

CMD ["npm", "start"]



