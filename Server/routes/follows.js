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
const { handleError, checkDoesUserExist } = require('../helpers/globalHelp.js');
const { processInput, handleSuccess } = require('../helpers/followsHelp.js');
const { authenticateUser } = require('../queries/authentication.js'); // for authentication
const { 
  getFollows,
  getFollowers,
  checkFollowExists,
  createFollow,
  deleteFollow
} = require('../queries/follows.js');


/* HELPERS */
// const checkIdParams = (req) => {
//   let problems = [];
//   if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId.trim()))) {
//     problems.push("current user_id");
//   }
//   if (!req.params.targetUserId || isNaN(parseInt(req.params.targetUserId.trim()))) {
//     problems.push("target user_id");
//   }
//   const currentUser = parseInt(req.params.currUserId.trim()) || null;
//   const targetUser = parseInt(req.params.targetUserId.trim()) || null;
//   if (currentUser && targetUser && currentUser === targetUser) {
//     problems.push("duplicate");
//   }
//   // COMPILE MESSAGE
//   if (problems.length) {
//     problems.length == 2
//       ? problems = problems.join(' and ')
//       : problems = problems.join('');
//     return problems;
//   }
//   return false;
// }


/* ROUTE HANDLES */
// getFollows: get all others the user is following
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

// getFollowers: get all following current user
router.get("/followers/:currUserId", async (req, res, next) => {
    try {
      if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId.trim()))) {
        throw new Error("400__error: invalid currUserId parameter");
      } else {
        const currUserId = parseInt(req.params.currUserId.trim());
        try {
          const followers = await getFollowers(currUserId);
          if (followers.length === 0) {
            const userExists = await getUserById(currUserId);
            if (userExists === "no match") {
              throw new Error("400__error: user does not exist");
            } else {
              handleSuccess(res, "followers", followers);
            }
          } else {
            handleSuccess(res, "followers", followers);
          }
        } catch (err) {
          throw (err);
        }
      }
    } catch (err) {
      handleError(err, req, res, next);
    }
});

// createFollow: make new follow relationship
router.post("/:currUserId/:targetUserId", async (req, res, next) => {
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
            const followExists = await checkFollowExists(currUserId, targetUserId);
            if (followExists) {
              throw new Error("403__error: follow already exists");
            } else {
              const response = await createFollow(currUserId, targetUserId);
              res.json({
                  status: "success",
                  message: "follow created",
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

// deleteFollow: delete follow relationship
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
            const followExists = await checkFollowExists(currUserId, targetUserId);
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
