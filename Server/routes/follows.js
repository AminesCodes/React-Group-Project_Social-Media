/*
Server Follows Route | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// TODO Add check if users exist in create/deleteFollows Route


/* IMPORTS */
//    external
const express = require('express');
    const router = express.Router();
    
//    local
const { handleError, getAuth, checkDoesUserExist } = require('../helpers/globalHelp.js');
const { processInput, handleSuccess } = require('../helpers/followsHelp.js');
const { 
  getFollows,
  getFollowers,
  createFollow,
  deleteFollow,
  checkDoesFollowExist
} = require('../queries/follows.js');


/* ROUTE HANDLES */
//    getFollows: get all others the user is following
router.get("/:currUserId", async (req, res, next) => {
    try {
      const currUserId = processInput(req, "currUserId");
      const follows = await getFollows(currUserId);
      await checkDoesUserExist(follows, currUserId);
      handleSuccess(res, follows, currUserId, "follows");
    } catch (err) {
      handleError(err, req, res, next);
    }
});

//    getFollowers: get all following current user
router.get("/followers/:currUserId", async (req, res, next) => {
    try {
      const currUserId = processInput(req, "currUserId");
      const followers = await getFollowers(currUserId);
      await checkDoesUserExist(followers, currUserId);
      handleSuccess(res, followers, currUserId, "followers");
    } catch (err) {
      handleError(err, req, res, next);
    }
});

//    createFollow: make new follow relationship
router.post("/add/:currUserId/:targetUserId", async (req, res, next) => {
    try {
      const currUserId = processInput(req, "currUserId");
      const targetUserId = processInput(req, "targetUserId");
      const password = processInput(req, "password");
      const [ authorized ] = await Promise.all([
        getAuth(currUserId, password),
        checkDoesFollowExist(currUserId, targetUserId)
      ]);
      if (authorized) {
        const response = await createFollow(currUserId, targetUserId);
        res.json({
            status: "success",
            message: `follow ${currUserId} -> ${targetUserId} created`,
            payload: response
        });
      } else {
        throw new Error("401__error: authentication failure");
      }
    } catch (err) {
      handleError(err, req, res, next);
    }
});

//    deleteFollow: delete follow relationship
router.patch("/delete/:currUserId/:targetUserId", async (req, res, next) => {
    try {
      const paramsCheck = checkIdParams(req);
      if (paramsCheck) {
        throw new Error(`400__error: invalid ${paramsCheck} parameter(s)`);
      } else {
        const currUserId = parseInt(req.params.currUserId.trim());
        const targetUserId = parseInt(req.params.targetUserId.trim());
        let password, authorized = null;
        req.body.password
          ? password = req.body.password.trim()
          : false;
        try {
          authorized = await authenticateUser(currUserId, password);
        } catch(err) {
          throw new Error("500__error: problem during authentication query");
        }
        if (authorized) {
          try {
            const followExists = await checkDoesFollowExist(currUserId, targetUserId);
            if (!followExists) {
              throw new Error("400__error: follow does not exist");
            } else {
              const response = await deleteFollow(currUserId, targetUserId);
              res.json({
                  status: "success",
                  message: "follow deleted",
                  payload: response
              });
            }
          } catch (err) {
            throw (err);
          }
        } else {
          throw new Error("401__error: authentication issue");
        }
      }
    } catch (err) {
      handleError(err, req, res, next);
    }
});


/* EXPORT */
module.exports = router;
