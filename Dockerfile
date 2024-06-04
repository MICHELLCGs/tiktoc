FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g react-scripts

COPY . .

EXPOSE 3000

CMD ["npm", "start"]