const { StatusCodes } = require('http-status-codes');

const saveUrl = async (req, res, next) => {
    if (req.user) {
        let url = req.url;
        if (
            !url.includes('.js') &&
            !url.includes('.gif') &&
            url.length >= 5 &&
            url.substring(0, 5) != '/vote' &&
            url.substring(0, 4) != '/log' &&
            url.substring(0, 5) != '/user' &&
            !url.includes('css')
        ) {
            req.session.prevUrl = req.url;
            console.log(`saved url ${req.url} for ${req.user.id}`);
        } else {
            console.log(`ignoring saveUrl for: ${url}`);
        }
        next();
    } else {
        next();
    }
};

module.exports = saveUrl;
