const express = require("express");
const router = express.Router();

// Controllers
const api = require("../controllers/api.js");

// Middlewares
const authorLogged = require("../middlwares/apiAuthorLogged");
const selfLogged = require("../middlwares/apiSelfLogged");
const basicLogged = require("../middlwares/apiBasicLogged");

// Endpoints
router.get("/index", api.index);
router.get("/newest", api.newest);
router.get("/ask", api.ask);
router.post("/item", authorLogged, api.submitPost);
router.get("/item/:itemId", api.item);
router.post("/item/:itemId", authorLogged, api.itemComment);
router.get("/user/:userId", api.user);
router.post("/user/:userId/edit", selfLogged, api.userEdit); // Cambiar a PUT
router.get("/item/:itemId/vote", basicLogged, api.vote); // Cambiar a PUT
router.get("/user/:userId/threads", api.threads); // Falta añdir lógica añadida que está en el controller y no en la lógica
router.get("/user/:userId/likedposts", selfLogged, api.likedPosts);
router.get("/user/:userId/likedcomments", selfLogged, api.likedComments);

module.exports = router;
