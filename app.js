const express = require('express');
const app = express();
const sequelize = require('./db/connect');

const index = require('./routes/index');
const login = require('./routes/login');
const submit = require('./routes/submit');
const authenticateUser = require('./middlewares/authentication');

// Middlewares
app.use(express.json());

// Routes
app.use('/', index);
app.use('/login', login);
app.use('/submit', authenticateUser, submit);

const port = process.env.PORT || 13001;

const start = async () => {
    try {
        console.log('Testing database connection...');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log('Syncing database...');
        sequelize.sync();
        console.log('Syncronized database successfull.');
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
