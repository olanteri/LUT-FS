const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Todo = require('../models/todo');

// register 
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    });
});

// authenticate 
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// get todo list 
router.get('/todo', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

// add todo 
router.post('/todo', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newTodo = new Todo ({
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
        isDone: false
    });
    Todo.addTodo(newTodo, (err, todo) => {
        if (err) {
            res.json({success: false, msg:'Failed to add new todo'});
        } else {
            res.json({success: true, msg:'Todo added'});
        }
    })
});

// update todo
router.put('/todo/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const todo = Todo.getTodoById(req.params.id, (err, todo) => {
        if (err) {
            res.json({success: false, msg:'Failed to update todo'});
        } else {
            todo.title = req.body.title;
            todo.description = req.body.description;
            todo.user = req.body.name;
            todo.isDone = req.body.isDone;
            todo.save();
        }
        res.json(todo);
    });
});

// delete todo
router.delete('/todo/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let todo = Todo.getTodoById(req.params.id, (err, todo) => {
        if (err) {
            res.json({success: false, msg:'Failed to delete todo'});
        } else {
            todo.remove();
            res.json({success: true, msg:'Todo is deleted'});
        }
    });
});

module.exports = router;