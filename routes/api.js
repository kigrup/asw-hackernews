const express = require("express");
const router = express.Router();

// Controllers
const api = require("../controllers/api.js");

// Middlewares
const selfLogged = require("../middlewares/apiSelfLogged.js");
const basicLogged = require("../middlewares/apiBasicLogged.js");

// Endpoints
router.get("/index", api.index);
router.get("/newest", api.newest);
router.get("/ask", api.ask);
router.post("/item", basicLogged, api.submitPost);
router.get("/item/:itemId", api.item);
router.post("/item/:itemId", basicLogged, api.itemComment);
router.get("/user/:userId", api.user);
router.put("/user/:userId", selfLogged, api.userEdit);
router.put("/item/:itemId/vote", basicLogged, api.vote);
router.get("/user/:userId/threads", api.threads);
router.get("/user/:userId/likedposts", selfLogged, api.likedPosts);
router.get("/user/:userId/likedcomments", selfLogged, api.likedComments);

module.exports = router;
