import axios from 'axios';

describe('todoItem resolvers', () => {
  test('createTodoItem', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          createTodoItem(todoId: 3, content: "Test item 3") {
            content
            complete
          }
        } 
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        createTodoItem: {
          content: 'Test item 3',
          complete: false
        }
      }
    })
  });

  test('updateTodoItem', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          updateTodoItem(id: 3, content: "Test update item 3", complete: true) {
            content
            complete
          }
        } 
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        updateTodoItem: {
          content: 'Test update item 3',
          complete: true
        }
      }
    })
  });

  test('deleteTodoItem', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          deleteTodoItem(id: 3) 
        } 
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        "deleteTodoItem": true
      }
    })
  });
});