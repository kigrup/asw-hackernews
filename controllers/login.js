const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {
    res.send('Logueate bro');

    res.status(StatusCodes.OK);
};

module.exports = { login };
