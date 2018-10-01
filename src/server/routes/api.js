import express from 'express';
const router = express.Router();

import todos from './api/todos';

router.use('/todos', todos );

export default router;
