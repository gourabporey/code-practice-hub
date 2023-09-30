const assert = require('assert');
const { describe, it } = require('node:test');
const { TodoRepository } = require('../../src/models/todo-repository');
const { expect, matchArg, anyFunction } = require('../test-utils');

describe('TodoRepository', () => {
  describe('updateTodos', () => {
    it('should update the file with stringifiied todos', (context) => {
      const path = 'dev-path';
      const fs = { writeFile: context.mock.fn((_, __, cb) => cb()) };
      const logger = { log: context.mock.fn() };

      const todoRepo = new TodoRepository(path, fs, logger);
      const todos = [{ id: 0, desc: 'hello' }];
      const stringifiedTodos = JSON.stringify(todos, null, 2);

      todoRepo.updateTodos(todos);

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledWith(
        matchArg(path),
        matchArg(stringifiedTodos),
        anyFunction
      );
      expect(logger.log).toNotHaveBeenCalled();
    });
  });

  describe('getPreviousTodos', () => {
    it('should give an empty list when no todos are present', () => {
      const fs = { existsSync: () => false };
      const todoRepo = new TodoRepository(null, fs, null);
      assert.deepStrictEqual(todoRepo.getPreviousTodos(), []);
    });

    it('should give an empty list for no todos there in the file', () => {
      const fs = { existsSync: () => true, readFileSync: () => null };
      const todoRepo = new TodoRepository(null, fs, null);
      assert.deepStrictEqual(todoRepo.getPreviousTodos(), []);
    });

    it('should give the parsed todolists', () => {
      const todoLists = JSON.stringify([
        {
          id: 0,
          heading: 'Work',
          deleted: false,
          todos: [
            {
              id: 0,
              description: 'Fill timesheet',
              deleted: false,
              marked: false,
            },
            {
              id: 1,
              description: 'Submit report',
              deleted: false,
              marked: false,
            },
          ],
        },
      ]);

      const fs = { existsSync: () => true, readFileSync: () => todoLists };
      const todoRepo = new TodoRepository(null, fs, null);
      assert.deepStrictEqual(
        todoRepo.getPreviousTodos(),
        JSON.parse(todoLists)
      );
    });
  });
});
