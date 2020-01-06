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
const handleError = (req, res, error) => {
  console.log(error);
  res.status(500);
  res.json({
      status: "fail",
      message: "error: backend issue",
      payload: null
  });
}

const checkNumId = (req, res, whichId) => {
  const { [whichId] } = req.params;
  if (![whichId] || isNaN(parseInt([whichId].trim()))) {
    return handleError(req, res, `invalid ${whichId} parameter`);
  }
}


/* ROUTE HANDLES */
// getFollows: get all others the user is following
router.get("/:currUserId", async (req, res) => {
    checkNumId(req, res, "currUserId");
    try {
      const follows = await getFollows(parseInt(req.params.currUserId.trim()));
      res.json({
          status: "success",
          message: "followings retrieved",
          payload: follows
      });
    } catch (err) {
      handleError(req, res, err);
    }
});

// getFollowers: get all following current user
router.get("/whofollows/:currUserId", async (req, res) => {
    checkNumId(req, res, "currUserId");
    try {
      const followers = await getFollowers(parseInt(req.params.currUserId.trim()));
      res.json({
          status: "success",
          message: "followers retreived",
          payload: followers
      });
    } catch (err) {
      handleError(req, res, err);
    }
});

// createFollow: make new follow relationship
router.post("/:currUserId/:targetUserId", async (req, res) => {
    checkNumId(req, res, "currUserId");
    checkNumId(req, res, "targetUserId");
    const { currUserId, targetUserId } = req.params;
    try {
      const response = await createFollow(currUserId, targetUserId);
      res.json({
          status: "success",
          message: "follow created",
          payload: response
      });
    } catch (err) {
      handleError(req, res, err);
    }
});

// deleteFollow: delete follow relationship
router.delete("/:currUserId/:targetUserId", async (req, res) => {
    checkNumId(req, res, "currUserId");
    checkNumId(req, res, "targetUserId");
    try {
      const response = await deleteFollow(currUserId, targetUserId);
      res.json({
          status: "success",
          message: "follow deleted",
          payload: response
      });
    } catch (err) {
      handleError(req, res, err);
    }
});


/* EXPORT */
module.exports = router;
