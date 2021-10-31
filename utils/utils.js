const emailToUsername = (email) => {
    return email.match(/.+?(?=@)/)[0];
};

module.exports = {
    emailToUsername: emailToUsername
};
