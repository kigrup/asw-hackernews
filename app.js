const express = require('express');
const app = express();
const db = require('./db/db');

const index = require('./routes/index');
const login = require('./routes/login');
const submit = require('./routes/submit');
const item = require('./routes/item');
const user = require('./routes/user');
const authenticateUser = require('./middlewares/authentication');

// Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static('public'));

// EJS
app.set('view engine', 'ejs');

// Routes
app.use('/', index);
app.use('/login', login);
app.use('/submit', authenticateUser, submit);
app.use('/item', item);
app.use('/user', user);

const port = process.env.PORT || 13001;

const start = async () => {
    try {
        console.log('Testing database connection...');
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log('Syncing database...');
        db.sequelize.sync();
        console.log('Syncronized database successfull.');
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error.message);
    }
};

start();
