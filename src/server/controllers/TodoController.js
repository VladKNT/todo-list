import { Todo, TodoItem } from '../models';

export default class TodoController {
  static create(req, res) {
    return Todo
      .create({
        title: req.body.title
      })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  }

  static update(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found'
          })
        }

        return todo
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(todo))
          .catch((error) => {
            res.status(400).send(error)
          });
      })
      .catch((error) => {
        res.status(400).send(error)
      });
  }

  static destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found'
          })
        }

        return todo
          .destroy()
          .then(() => () => res.status(200).send({
            message: 'Todo list was deleted'
          }))
          .catch((error) => {
            res.status(400).send(error)
          });
      })
      .catch((error) => {
        res.status(400).send(error)
      });
  }

  static getList(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then((todos) => res.status(201).send(todos))
      .catch((error) => {
        res.status(400).send(error)
      });
  }

  static getById(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found'
          })
        }

        return res.status(200).send(todo)
      })
      .catch((error) => {
        res.status(400).send(error)
      });
  }
}
