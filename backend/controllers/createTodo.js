const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    //extract title and description from request body
    const { title, description, dueDate, label } = req.body;
    //create a new todo obj and insert it in DB
    const response = await Todo.create({ title, description, dueDate, label });
    res.status(200).json({
      success: true,
      data: response,
      message: 'Entry Created successfully',
    });
  } catch (err) {
    console.error(err);
    console.log(`error`);
    res.status(500).json({
      success: false,
      data: 'internal server error',
      message: err.message,
    });
  }
};
