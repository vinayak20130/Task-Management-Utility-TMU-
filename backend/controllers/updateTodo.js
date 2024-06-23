const Todo = require('../models/Todo');

exports.updateTodo = async (req, res) => {
  try {
    // extract todo items basis on id
    const { id } = req.params;
    const { title, description, dueDate, label } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now(),dueDate }
    );

    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} data successfully fetched`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      err: err.message,
    });
  }
};
