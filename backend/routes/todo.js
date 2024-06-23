const express = require('express');
const router = express.Router();

// import controller
const { createTodo } = require('../controllers/createTodo');
const { getaTodo, getTodoById } = require('../controllers/getaTodo');
const { updateTodo } = require('../controllers/updateTodo');
const { deleteTodo } = require('../controllers/deleteTodo');

//define API routes
router.post('/createTodo', createTodo);
router.get('/getaTodo', getaTodo);
router.get('/getaTodo/:id', getTodoById);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

module.exports = router;
