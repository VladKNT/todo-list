import express from 'express';
const router = express.Router();

import { TodoController, TodoItemsController } from '../../controllers';

// TodosTable
router.post('/', TodoController.create);
router.put('/:todoId', TodoController.update);
router.delete('/:todoId', TodoController.destroy);
router.get('/', TodoController.getList);
router.get('/:todoId', TodoController.getById);

// TodoItemsTable
router.post('/:todoId/items', TodoItemsController.create);
router.put('/:itemId/items', TodoItemsController.update);
router.delete('/:itemId/items', TodoItemsController.destroy);

export default router;
