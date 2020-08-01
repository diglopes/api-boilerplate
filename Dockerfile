FROM node:8-alpine

WORKDIR /usr/app/

COPY package*.json /usr/app/

COPY . .

RUN npm install --production

USER node

CMD ["npm", "run", "start"] 