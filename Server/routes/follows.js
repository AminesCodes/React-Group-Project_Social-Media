/*
Server Follows Route | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


/* MODULE INITS */
const express = require('express');
const router = express.Router();
// Queries
const { 
  getFollows,
  getFollowers,
  createFollow,
  deleteFollow
} = require('../Models/follows.js');


/* HELPERS */
const handleError = (res, error) => {
  console.log(error);
  res.status(500);
  res.json({
      status: "fail",
      message: "error: backend issue",
      payload: null
  });
}

const checkTwoNumParams = (req) => {
  let problems = [];
  if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId.trim()))) {
    problems.push("current user_id");
  }
  if (!req.params.targetUserId || isNaN(parseInt(req.params.targetUserId.trim()))) {
    problems.push("target user_id");
  }
  // COMPILE MESSAGE
  if (problems.length) {
    if (problems.length >= 2) {
      problems[problems.length - 1] = "and " + problems[problems.length - 1];
      problems = problems.join(' ');
    } else {
      problems = problems.join('');
    }
    return problems;
  }
  return false;
}


/* ROUTE HANDLES */
// getFollows: get all others the user is following
router.get("/:currUserId", async (req, res) => {
    if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId.trim()))) {
      handleError(res, 'invalid currUserId parameter');
    } else {
      try {
        const follows = await getFollows(parseInt(req.params.currUserId.trim()));
        res.json({
            status: "success",
            message: "followings retrieved",
            payload: follows
        });
      } catch (err) {
        handleError(res, err);
      }
    }
});

// getFollowers: get all following current user
router.get("/whofollows/:currUserId", async (req, res) => {
    if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId.trim()))) {
      handleError(res, 'invalid currUserId parameter');
    } else {
      try {
        const followers = await getFollowers(parseInt(req.params.currUserId.trim()));
        res.json({
            status: "success",
            message: "followers retreived",
            payload: followers
        });
      } catch (err) {
        handleError(res, err);
      }
    }
});

// createFollow: make new follow relationship
router.post("/:currUserId/:targetUserId", async (req, res) => {
    const paramsCheck = checkTwoNumParams(req);
    if (paramsCheck) {
      handleError(res, `invalid ${paramsCheck} parameter`);
    } else {
      let authorized = null;
      try {
        authorized = await Users.authenticateUser(userId, password);
      } catch(err) {
        handleError(res, "error during authentication query");
      }
      if (authorized) {
        const currUserId = parseInt(req.params.currUserId.trim());
        const targetUserId = parseInt(req.params.targetUserId.trim());
        try {
          const response = await createFollow(currUserId, targetUserId);
          res.json({
              status: "success",
              message: "follow created",
              payload: response
          });
        } catch (err) {
          handleError(res, err);
        }
      } else {
        console.log('Authentication issue')
        res.status(401);
        res.json({
            status: 'fail',
            message: 'Authentication issue',
            payload: null,
        });
      }
    }
});

// deleteFollow: delete follow relationship
router.delete("/:currUserId/:targetUserId", async (req, res) => {
    const paramsCheck = checkTwoNumParams(req);
    if (paramsCheck) {
      handleError(res, `invalid ${paramsCheck} parameter`);
    } else {
      let authorized = null;
      try {
        authorized = await Users.authenticateUser(userId, password);
      } catch(err) {
        handleError(res, "error during authentication query");
      }
      if (authorized) {
        const currUserId = parseInt(req.params.currUserId.trim());
        const targetUserId = parseInt(req.params.targetUserId.trim());
        try {
          const response = await deleteFollow(currUserId, targetUserId);
          res.json({
              status: "success",
              message: "follow deleted",
              payload: response
          });
        } catch (err) {
          handleError(res, err);
        }
      } else {
        console.log('Authentication issue')
        res.status(401);
        res.json({
            status: 'fail',
            message: 'Authentication issue',
            payload: null,
        });
      }
    }
});


/* EXPORT */
module.exports = router;
