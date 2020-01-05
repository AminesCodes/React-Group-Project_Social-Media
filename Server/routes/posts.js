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
  const userId = parseInt(req.params.id.trim());
  try {
    const allPostsByUser = await getAllPostsByUser(userId);
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
router.get("/tag/:hashtag", async (req, res) => {
  if (!req.params.hashtag) {
    handleError(req, res, "empty hashtag parameter");
  }
  const hashtag = req.params.hashtag.trim();
  try {
    const allPostsByHashtag = await getAllPostsByHashtag(hashtag);
    res.json({
        status: "success",
        message: `all posts with hashtag "${hashtag}" retrieved`,
        payload: allPostsByHashtag
    });
  } catch (err) {
    handleError(req, res, err);
  }
});

// onePost: get global user posts with specific hashtag
router.get("/:id", async (req, res) => {
  if (!req.params.id || isNaN(parseInt(req.params.id))) {
    handleError(req, res, "invalid post_id parameter");
  }
  const postId = req.params.id;
  try {
    const onePost = await getOnePost(postId);
    res.json({
        status: "success",
        message: `post ${postId} retrieved`,
        payload: onePost
    });
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
