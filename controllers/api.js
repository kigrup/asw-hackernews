const index = require('./api/index');
const newest = require('./api/newest');
const ask = require('./api/ask');
const submitPost = require('./api/submitPost');
const item = require('./api/item');
const itemComment = require('./api/itemComment');
const user = require('./api/user');
const userEdit = require('./api/userEdit');
const vote = require('./api/vote');
const threads = require('./api/threads');
const likedPosts = require('./api/likedPosts');
const likedComments = require('./api/likedComments');

module.exports = {
    index,
    newest,
    ask,
    submitPost,
    item,
    itemComment,
    user,
    userEdit,
    vote,
    threads,
    likedPosts,
    likedComments
}