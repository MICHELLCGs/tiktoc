FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g react-scripts

RUN npm install react

COPY . .

EXPOSE 3000

CMD ["npm", "start"]