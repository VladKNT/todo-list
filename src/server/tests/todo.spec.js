import axios from 'axios';

describe('todo resolvers', () => {
  test('getAllTodos', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        query {
          getAllTodos {
            id
            title
            todoItems {
              id
              content
              complete
            }
          }
        }   
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        getAllTodos: [
          {
            id: 1,
            title: 'Test list 1',
            todoItems: [
              {
                id: 1,
                content: 'Test item 1',
                complete: true
              },
              {
                id: 2,
                content: 'Test item 2',
                complete: false
              }
            ]
          },
          {
            id: 2,
            title: 'Test list 2',
            todoItems: []
          },
          {
            id: 3,
            title: 'Test list 3',
            todoItems: []
          }
        ]
      }
    })
  });

  test('getTodoById', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        query {
          getTodoById(id: 1) {
            id,
            title,
            todoItems {
              id,
              content,
              complete
            }
          }
        }
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        getTodoById: {
          id: 1,
          title: 'Test list 1',
          todoItems: [
            {
              id: 1,
              content: 'Test item 1',
              complete: true
            },
            {
              id: 2,
              content: 'Test item 2',
              complete: false
            }
          ]
        }
      }
    })
  });

  test('createTodo', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          createTodo(title: "Test list 4") {
            title
            todoItems {
              content
            }
          }
        } 
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        createTodo: {
            title: 'Test list 4',
            todoItems: null
        }
      }
    })
  });

  test('updateTodo', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          updateTodo(id: 2, title: "Test update list 2") {
            title
            todoItems {
              content
            }
          }
        } 
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        updateTodo: {
          title: 'Test update list 2',
          todoItems: []
        }
      }
    })
  });

  test('deleteTodo', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          deleteTodo(id: 2) 
        } 
      `
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        "deleteTodo": true
      }
    })
  });
});