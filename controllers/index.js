const { StatusCodes } = require('http-status-codes');

const index = async (req, res) => {
    res.send('Casa dulce casa');

    res.status(StatusCodes.OK);
};

module.exports = { index };
