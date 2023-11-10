FROM node:18.16.0-alpine3.17

WORKDIR /app

#COPY . .

COPY ["package.json", "package-lock.json", ".env", "./"]
COPY ./src ./src

#RUN npm install --global nodemon

RUN npm install

ENV PORT $PORT

ARG PORT
RUN echo $PORT
#EXPOSE 3003
EXPOSE $PORT

#CMD ["node", "app.js"]
CMD ["npm", "run", "dev"]
