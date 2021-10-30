const emailToUsername = (email) => {
    return email.match(/.+?(?=@)/);
};

module.exports = emailToUsername;
