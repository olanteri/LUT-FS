const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const User = require('../models/user');

// todo schema
const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean
    }
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);

module.exports.getTodoById = function(id, callback) {
    Todo.findById(id, callback);
}

module.exports.addTodo = function(todo, callback) {
    todo.save(callback);
}
