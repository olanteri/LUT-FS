const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// mongoose database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});
// if errors
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const database = require('./config/database');
const router = require('./routes/router');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// middleware for body parser
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

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })

// start server
app.listen(port, () => {
    console.log('Server started on port ' + port)
});

app.use('/users', router);