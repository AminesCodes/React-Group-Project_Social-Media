/*
Server Posts Route | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// TODO
/* 
- hashtag parse mulitple words => IN?
- MULTER for image upload
Just really quick (I didn't read all the code) but we're not getting the imageUrl through the request req.body
We're supposed to use multer to upload the image (received within the request), once uploaded to the local folder Server/public/images/posts we can use multer params to make the image url that we will store in our database
this also refers to line 141
- add upload to createPOst

*/



/* MODULE INITS */
const express = require('express');
    const router = express.Router();
const multer = require('multer');
    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
          cb(null, './public/images/posts');
        },
        filename: (request, file, cb) => {
          const fileName = Date.now() + "-" + file.originalname;
          cb(null, fileName);
        }
    });
    const fileFilter = (request, file, cb) => {
      if ((file.mimetype).slice(0, 6) === 'image/') {
          cb(null, true);
      } else {
          cb(null, false);
      }
    };
    const upload = multer({ 
        storage: storage,
        fileFilter: fileFilter,
    });

// local
const { handleError } = require('../helpers.js');
const { authenticateUser } = require('../queries/authentication.js'); // for authentication
const { getUserById } = require('../queries/users.js'); // for checking if user exists after no results
const { 
  getAllPosts,
  getAllPostsByUser,
  getAllPostsByHashtags,
  getOnePost,
  createPost,
  deletePost
} = require('../queries/posts.js');


const processInput = (req, location) => {
  switch (location) {
    case "offset":
      if (!req.query.offset || !req.query.offset.trim()) {
        return 0;
      }
      if (isNaN(parseInt(req.query.offset.trim()))) {
        throw new Error("400__error: invalid offset parameter");
      }
      return parseInt(req.query.offset.trim());
    case "userId":
      if (!req.params.id || !req.params.id.trim() || isNaN(parseInt(req.params.id))) {
        throw new Error("400__error: invalid user_id parameter");
      }
      return parseInt(req.params.id);
    case "search hashtags":
      if (!req.query.hashtags || !req.query.hashtags.trim()) {
        throw new Error("400__error: empty hashtags parameter");
      }
      const hashtagsInput = req.query.hashtags.trim();
      let hashtagsArr = hashtagsInput.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
      const formattedHashtagsArr = hashtagsArr.map(tag => `%#${tag}#%`);
      return ({
          parsed: hashtagsArr.join(', '),
          formatted: formattedHashtagsArr
      });
    case "postId":
      if (!req.params.postId || !req.params.postId.trim() || isNaN(parseInt(req.params.postId))) {
        throw new Error("400__error: invalid post_id parameter");
      }
      return parseInt(req.params.postId);
    case "posterId":
      if (!req.body.currUserId || isNaN(parseInt(req.body.currUserId))) {
        throw new Error("400__error: invalid parsed current user id");
      }
      return parseInt(req.body.currUserId);
    case "password":
      if (!req.body.password || !req.body.password.trim()) {
        throw new Error("401__error: invalid password");
      }
      return req.body.password.trim();
    case "caption":
      if (!req.body.caption || !req.body.caption.trim()) {
        return ({
            caption: null,
            formattedHashtags: null
        });
      }
      const caption = req.body.caption.trim();
      let words = caption.replace(/[^a-zA-Z0-9 #]/g, "").split(' ');
      let hashtags = words.filter(word => word[0] === '#');
      const formattedHashtags = hashtags.length ? hashtags.join('') + "#" : null;
      return ({
          caption,
          formattedHashtags
      });
    default:
      throw new Error("500__error: you're not supposed to be here");
  }
}


/* MIDDLEWARE */


/* ROUTE HANDLES */
// getAllPosts: get global user posts
// LIMITED TO 10 with OPTIONAL OFFSET for feed functionality
router.get("/", async (req, res, next) => {
    try {
      const offset = processInput(req, "offset");
      const allPosts = await getAllPosts(offset);
      res.json({
          status: "success",
          message: "all posts retrieved",
          payload: allPosts.length === 1 ? allPosts[0] : allPosts
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

// getAllPostsByUser: get all of a single user's posts
// LIMITED TO 10 with OPTIONAL OFFSET for feed functionality
router.get("/userid/:id", async (req, res, next) => {
    try {
        const userId = processInput(req, "userId");
        const offset = processInput(req, "offset");
        const allPostsByUser = await getAllPostsByUser(userId, offset);
        if (allPostsByUser.length === 0) {
          const doesUserExist = await getUserById(userId);
          if (doesUserExist === 'no match') {
            throw new Error("400__error: user does not exist");
          }
        }
        res.json({
            status: "success",
            message: `all posts of user ${userId} retrieved`,
            payload: allPostsByUser.length === 1 ? allPostsByUser[0] : allPostsByUser
        });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

// getAllPostsByHashtags: get global user posts with specific hashtag
// LIMITED TO 10 with OPTIONAL OFFSET for feed functionality
router.get("/tags", async (req, res, next) => {
    try {
      const hashtags = processInput(req, "search hashtags");
      const offset = processInput(req, "offset");
      const allPostsByHashtags = await getAllPostsByHashtags(hashtags.formatted, offset);
      res.json({
          status: "success",
          message: `all posts with hashtags '${hashtags.parsed}' retrieved`,
          payload: allPostsByHashtags
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

// getOnePost: get one single post by post_id
router.get("/:postId", async (req, res, next) => {
    try {
      const postId = processInput(req, "postId");
      const onePost = await getOnePost(postId);
      res.json({
          status: "success",
          message: `post ${postId} retrieved`,
          payload: onePost
      });
    } catch (err) {
      if (err.message === "No data returned from the query.") {
        res
          .status(404)
          .json({
              status: "fail",
              message: `no post with id ${req.params.postId} found`,
              payload: null
          });
      } else {
        handleError(err, req, res, next);
      }
    }
});

// createPost: create a single post
router.post("/add", async (req, res, next) => {
    try {
      const { caption, formattedHashtags } = processInput(req, "caption");
      const posterId = processInput(req, "posterId");
      const password = processInput(req, "password");
      const authorized = await authenticateUser(posterId, password);
      if (authorized) {
        const response = await createPost({
            ownerId: posterId,
            caption,
            formattedHashtags,
            imageUrl: "temp"
        });
        res.json({
            status: "success",
            message: "new post created",
            payload: response
        });
      } else {
        throw new Error("401__error: authentication failure");
      }
    } catch (err) {
      handleError(err, req, res, next);
    }
});

// // deletePost: delete a post
// router.delete("/:postId", async (req, res, next) => {
//     if (!req.params.postId || isNaN(parseInt(req.params.postId))) {
//       handleError(req, res, "invalid post_id parameter");
//     }
//     try {
//       const response = await deletePost(parseInt(req.params.postId));
//       res.json({
//           status: "success",
//           message: `post ${postId} deleted`,
//           payload: response
//       });
//     } catch (err) {
//       handleError(err, req, res, next);
//     }
// });


/* EXPORT */
module.exports = router;
