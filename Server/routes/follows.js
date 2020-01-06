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


/* ROUTE HANDLES */
// getFollows: get all others the user is following
router.get("/:currUserId", async (req, res) => {
  try {
    const follows = await getFollows();
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
router.get("/followers/:currUserId", async (req, res) => {
  // try {
  //   const followers = await getFollowers();
  //   res.json({
  //       status: "success",
  //       message: "followers retreived",
  //       payload: followers
  //   });
  // } catch (err) {
  //   handleError(req, res, err);
  // }
});

// createFollow: make new follow relationship
router.post("/:currUserId/:targetUserId", async (req, res) => {
  // try {
  //   const response = await createFollow();
  //   res.json({
  //       status: "success",
  //       message: "follow created",
  //       payload: response
  //   });
  // } catch (err) {
  //   handleError(req, res, err);
  // }
});

// deleteFollow: delete follow relationship
router.delete("/:currUserId/:targetUserId", async (req, res) => {
  // try {
  //   const response = await deleteFollow();
  //   res.json({
  //       status: "success",
  //       message: "follow deleted",
  //       payload: response
  //   });
  // } catch (err) {
  //   handleError(req, res, err);
  // }
});


/* EXPORT */
module.exports = router;
