FROM node:8.9.0


RUN mkdir /todo-list
WORKDIR /todo-list

COPY . .

RUN npm install nodemon -g
RUN npm install -g sequelize-cli
RUN npm install

EXPOSE 3000

CMD npm start