FROM node:8.9.0

ARG NODE_ENV="production"

RUN mkdir /todo-list
WORKDIR /todo-list

COPY . .

RUN npm install nodemon -g
RUN npm install -g sequelize-cli
RUN npm install

EXPOSE 3000

CMD npm start