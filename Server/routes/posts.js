/*
Server Posts Route | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


/* MODULE INITS */
const express = require('express');
const router = express.Router();
// Queries
const { 
  getAllPosts,
  getAllPostsByUser,
  getAllPostsByHashtag,
  getOnePost,
  createPost,
  deletePost
} = require('../queries/posts');


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

const parseHashtags = (str) => {
  if (!str || !str.trim()) {
    return;
  }
  const words = str.trim().split(' ');
  return words.filter(word => word[0] === '#').join(' ');
}


/* MIDDLEWARE */
const checkPostInputs = (req, res, next) => {
  let problems = [];
  if (!req.body.imageUrl || !req.body.imageUrl.trim()) {
    problems.push("invalid image");
  }
  if (!req.body.ownerId || isNaN(parseInt(req.body.ownerId.trim()))) {
    problems.push("invalid owner id");
  }
  // COMPILE MESSAGE
  if (problems.length) {
    if (problems.length >= 2) {
      problems[problems.length - 1] = "and " + problems[problems.length - 1];
      problems = problems.join(' ');
    } else {
      problems = problems.join('');
    }
    res.status(404);
    res.json({
        status: "fail",
        message: `error: ${problems}. Please check your inputs and try again.`,
        payload: null
    });
  } else {
    next();
  }
}


/* ROUTE HANDLES */
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

// onePost: get one single post by post_id
router.get("/:postId", async (req, res) => {
    if (!req.params.postId || isNaN(parseInt(req.params.postId))) {
      handleError(req, res, "invalid post_id parameter");
    }
    const postId = parseInt(req.params.postId);
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

// createPost: create a single post
router.post("/", checkPostInputs, async (req, res) => {
    const { imageUrl, caption, ownerId } = req.body;
    const hashtagString = parseHashtags(caption) || "";
    try {
      const response = await createPost({
          imageUrl,
          caption,
          ownerId,
          hashtagString
      });
      res.json({
          status: "success",
          message: "post created",
          payload: response
      });
    } catch (err) {
      handleError(req, res, err);
    }
});

// removePost: delete a post
router.delete("/:postId", async (req, res) => {
    if (!req.params.postId || isNaN(parseInt(req.params.postId))) {
      handleError(req, res, "invalid post_id parameter");
    }
    try {
      const response = await deletePost(parseInt(req.params.postId));
      res.json({
          status: "success",
          message: `post ${postId} deleted`,
          payload: response
      });
    } catch (err) {
      handleError(req, res, err);
    }
});


/* EXPORT */
module.exports = router;
