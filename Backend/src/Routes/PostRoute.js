const express = require("express");
const router = express.Router();
const PostController = require("../controller/Postcontroller");
const { auth } = require("../Middleware/Auth");
router.post("/create", auth, PostController.createPost);
router.get("/getAll", auth, PostController.getAllPosts);
router.put("/update/:id", auth, PostController.updatePost);
router.delete("/delete/:id", auth, PostController.deletePost);

module.exports = router;
