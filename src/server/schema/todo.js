import { gql } from 'apollo-server-express';

export default gql`
  type Todo {
    id: Int!
    title: String!
    todoItems: [TodoItem!]
    createdAt: String!
    updatedAt: String
  }
  
  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(id: Int!, title: String): Todo!
    deleteTodo(id: Int!): Int!
  }
  
  type Query {
    getTodoById(id: Int!): Todo!
    getAllTodos: [Todo!]
  }
`;