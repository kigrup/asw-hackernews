const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = auth;
