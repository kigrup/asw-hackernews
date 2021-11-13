const { StatusCodes } = require('http-status-codes');

const saveUrl = async (req, res, next) => {
    if (req.user) {
        req.session.prevUrl = req.url;
        console.log(`saved url ${req.url} for ${req.user.id}`);
        next();
    } else {
        next();
    }
};

module.exports = saveUrl;
