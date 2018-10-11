import { gql } from 'apollo-server-express';

export default gql`
  type TodoItem {
    id: Int!
    content: String!
    complete: Boolean!
    todoId: Int!
    createdAt: String!
    updatedAt: String
  }
  
  type Mutation {
    createTodoItem(content: String!, todoId: Int!): TodoItem!
    updateTodoItem(id: Int!, content: String, complete: Boolean): TodoItem!
    deleteTodoItem(id: Int!): TodoItem!
  }
  
  type Subscription {
    todoItemSaved: TodoItem!
    todoItemDeleted: TodoItem!
  }
`;