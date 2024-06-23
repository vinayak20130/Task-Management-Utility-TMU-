const Todo = require('../models/Todo');

exports.getaTodo = async (req, res) => {
  try {
    //fetch all todo items from data base
    const todos = await Todo.find({});
    //response
    res.status(200).json({
      success: true,
      data: todos,
      message: 'data fetched',
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

exports.getTodoById = async (req, res) => {
  try {
    // extract todo items basis on id
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });
    // data for given id not find
    if (!todo) {
      return res.status(400).json({
        success: false,
        message: 'No Data found for given id',
      });
    }
    // data for given id found
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
