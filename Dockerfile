FROM node:18.16

WORKDIR /app 

COPY package*.json ./

COPY . .

RUN npm install 

EXPOSE 3000 

CMD ["npm","run","dev"]
