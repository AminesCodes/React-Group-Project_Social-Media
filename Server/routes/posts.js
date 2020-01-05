/*
Server Posts Route | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


/* MODULE INITS */
const express = require('express');
const router = express.Router();
// Queries
const { getAllPosts, getAllPostsByUser, getAllPostsByHashtag, getOnePost, createPost, deletePost } = require('../Models/posts.js');


/* HELPERS */
const handleError = (req, res, error) => {
  console.log(error);
  res.status(500);
  res.json({
      status: "fail",
      message: "error: backend issue",
      payload: null
  });
}


/* ROUTES */
// allPosts: get global user posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    res.json({
        status: "success",
        message: "all posts retrieved",
        payload: allPosts
    });
  } catch (err) {
    handleError(req, res, err);
  }
});

// allPostsByUser: get all of a single user's posts
router.get("/userid/:id", async (req, res) => {
  if (!req.params.id || isNaN(parseInt(req.params.id))) {
    handleError(req, res, "invalid user_id parameter");
  }
  const userId = parseInt(req.params.id);
  try {
    const allPostsByUser = getAllPostsByUser(userId);
    res.json({
      status: "success",
      message: `all posts of user ${userId} retrieved`,
      payload: allPostsByUser
  });
  } catch (err) {
    handleError(req, res, err);
  }
});

// allPostsByHashtag: get global user posts with specific hashtag
router.get("/:hashtag", async (req, res) => {
  const hashtag = req.params.hashtag;

  try {
    const allPostsByHashtag = await getAllPostsByHashtag();
  } catch (err) {
    handleError(req, res, err);
  }
});

// onePost: get global user posts with specific hashtag
router.get("/:hashtag", async (req, res) => {
  const hashtag = req.params.hashtag;

  try {
    const onePost = await getOnePost();
  } catch (err) {
    handleError(req, res, err);
  }
});

// addPost: create a post
router.post("/", async (req, res) => {
  try {

  } catch (err) {
    handleError(req, res, err);
  }
});

// removePost: delete a post
router.delete("/:postId", async (req, res) => {
  try {

  } catch (err) {
    handleError(req, res, err);
  }
});



/* EXPORT */
module.exports = router;
