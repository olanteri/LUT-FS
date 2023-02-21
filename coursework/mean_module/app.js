const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database);


// on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');
const database = require('./config/database');

// port number
const port = 3000;

// cors middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(session({
    secret: database.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/users', users);

// index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// start server
app.listen(port, () => {
    console.log('Server started on port ' + port)
});