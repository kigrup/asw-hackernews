const express = require('express');
const app = express();

const index = require('./routes/index');
const login = require('./routes/login');
const authenticateUser = require('./middlewares/authentication');

// Middlewares
app.use(express.json());

// Routes
app.use('/', index);
app.use('/login', login);
//app.use('/api/posts/', authenticateUser, jobsRouter);

const port = process.env.PORT || 13001;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
