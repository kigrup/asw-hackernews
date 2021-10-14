const express = require('express');
const app = express();

// Routers
const index = require('./routes/index.js')
const login = require('./routes/login.js');

// Routes
app.use('/', index)
app.use('/login', login);

// Middlewares
//app.use(notFoundMiddleware);
//app.use(errorHandlerMiddleware);

const port = process.env.PORT || 13373;

const start = async () => {
    try {
        //await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
