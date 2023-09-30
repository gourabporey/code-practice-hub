const request = require('supertest');
const { describe, it } = require('node:test');
const assert = require('assert');

const { createApp } = require('../src/app');
const { TodoLists } = require('../src/models/todo-lists');
const {
  TodoListsController,
  getTodoListsController,
} = require('../src/todo-lists-controller');

describe('App', () => {
  describe('GET /todolists', () => {
    it('should give empty todo list for no todolists being present', (_, done) => {
      const io = { existsSync: () => false };
      const config = { io, todoPath: null, logger: null };
      const todoListsController = getTodoListsController(config);

      const app = createApp({ todoListsController });

      request(app)
        .get('/todolists')
        .expect(200)
        .expect('content-type', /application\/json/)
        .expect([])
        .end(done);
    });

    it('should give all the todolists present', (_, done) => {
      const todos = [
        {
          id: 1,
          heading: 'home',
          deleted: false,
          todos: [
            { id: 1, description: 'do laundry', marked: false, deleted: false },
          ],
        },
      ];

      const todoLists = new TodoLists();
      const todoRepo = { getPreviousTodos: () => todos };
      const todoListsController = new TodoListsController(todoLists, todoRepo);
      todoListsController.restoreAllTodos();

      const app = createApp({ todoListsController });

      request(app)
        .get('/todolists')
        .expect(200)
        .expect('content-type', /application\/json/)
        .expect(todos)
        .end(done);
    });
  });

  describe('POST /todoLists', () => {
    it('should create a todoList and give the json back', (context, done) => {
      const todoLists = new TodoLists();
      const todoRepo = { updateTodos: context.mock.fn() };
      const todoListsController = new TodoListsController(todoLists, todoRepo);

      const app = createApp({ todoListsController });

      const expectedTodoList = {
        id: 0,
        heading: 'workplace',
        deleted: false,
        todos: [],
      };

      request(app)
        .post('/todolists')
        .send({ todoListTitle: 'workplace' })
        .expect(201)
        .expect('content-type', /application\/json/)
        .expect(expectedTodoList)
        .end((err) => {
          assert.strictEqual(todoRepo.updateTodos.mock.callCount(), 1);
          assert.deepStrictEqual(
            todoRepo.updateTodos.mock.calls[0].arguments[0],
            [expectedTodoList]
          );
          done(err);
        });
    });
  });

  describe('DELETE /todolists/:listId', () => {
    it('should delete the todolist when the id is valid', (context, done) => {
      const todoLists = new TodoLists();
      const todoRepo = { updateTodos: context.mock.fn() };
      const todoListsController = new TodoListsController(todoLists, todoRepo);
      todoListsController.addTodoList('work');

      const expectedTodoList = {
        id: 0,
        heading: 'work',
        deleted: true,
        todos: [],
      };

      const app = createApp({ todoListsController });

      request(app)
        .delete('/todolists/0')
        .expect(204)
        .end((err) => {
          done(err);
          assert.strictEqual(todoRepo.updateTodos.mock.callCount(), 2);
          assert.deepStrictEqual(
            todoRepo.updateTodos.mock.calls[1].arguments[0],
            [expectedTodoList]
          );
        });
    });
  });

  describe('POST /todolists/:listId/todos', () => {
    it('should add a new todo in the todolist of listId and give back json', (context, done) => {
      const todoLists = new TodoLists();
      const todoRepo = { updateTodos: context.mock.fn() };
      const todoListsController = new TodoListsController(todoLists, todoRepo);
      todoListsController.addTodoList('work');

      const expectedTodoList = {
        id: 0,
        heading: 'work',
        deleted: false,
        todos: [
          {
            id: 0,
            description: 'fill timesheet',
            marked: false,
            deleted: false,
          },
        ],
      };

      const app = createApp({ todoListsController });

      request(app)
        .post('/todolists/0/todos')
        .send({ todoDescription: 'fill timesheet' })
        .expect(201)
        .expect('content-type', /application\/json/)
        .expect(expectedTodoList.todos[0])
        .end((err) => {
          done(err);
        });
    });
  });

  describe('DELETE /todolists/:listId/todos/:todoId', () => {
    it('should delete the todo contained in the todolist', (context, done) => {
      const todoLists = new TodoLists();
      const todoRepo = { updateTodos: context.mock.fn() };
      const todoListsController = new TodoListsController(todoLists, todoRepo);

      todoListsController.addTodoList('work');
      todoListsController.addTodo(0, 'fill timesheet');

      const app = createApp({ todoListsController });

      request(app).delete('/todolists/0/todos/0').expect(204).end(done);
    });
  });

  describe('PATCH /todolists/:listId/todos/:todoId', () => {
    it('should toggle the todo status contained in the todolist', (context, done) => {
      const todoLists = new TodoLists();
      const todoRepo = { updateTodos: context.mock.fn() };
      const todoListsController = new TodoListsController(todoLists, todoRepo);

      todoListsController.addTodoList('work');
      todoListsController.addTodo(0, 'fill timesheet');

      const app = createApp({ todoListsController });

      request(app)
        .patch('/todolists/0/todos/0')
        .expect(200)
        .expect('content-type', /application\/json/)
        .expect({
          id: 0,
          description: 'fill timesheet',
          deleted: false,
          marked: true,
        })
        .end(done);
    });
  });
});
