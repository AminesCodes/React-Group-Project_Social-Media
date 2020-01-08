/*
Server Follows Route | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


/* IMPORTS */
const express = require('express');
    const router = express.Router();
    
// local
const { authenticateUser } = require('../queries/authentication.js'); // for authentication
const { getUserById } = require('../queries/users.js'); // for checking if user exists after no results
const { 
  getFollows,
  getFollowers,
  checkFollowExists,
  createFollow,
  deleteFollow
} = require('../queries/follows.js');


/* HELPERS */
const handleError = (res, error) => {
  console.log(error);
  res.status(500);
  res.json({
      status: "fail",
      message: `error: (be) ${error}`,
      payload: null
  });
}

const handleSuccess = (res, path, data) => {
  res.json({
    status: "success",
    message: `${path} data retrieved`,
    payload: data.length === 1 ? data[0] : data
  });
}

const checkIdParams = (req) => {
  let problems = [];
  if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId.trim()))) {
    problems.push("current user_id");
  }
  if (!req.params.targetUserId || isNaN(parseInt(req.params.targetUserId.trim()))) {
    problems.push("target user_id");
  }
  // COMPILE MESSAGE
  if (problems.length) {
    problems.length == 2
      ? problems = problems.join(' and ')
      : problems = problems.join('');
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
      const currUserId = parseInt(req.params.currUserId.trim());
      try {
        const follows = await getFollows(currUserId);
        if (follows.length === 0) {
          const userExists = await getUserById(currUserId);
          if (userExists === 'no match') {
            handleError(res, 'user does not exist');
          } else {
            handleSuccess(res, 'follows', follows);
          }
        } else {
          handleSuccess(res, 'follows', follows);
        }
      } catch (err) {
        handleError(res, err);
      }
    }
});

// getFollowers: get all following current user
router.get("/followers/:currUserId", async (req, res) => {
    if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId.trim()))) {
      handleError(res, 'invalid currUserId parameter');
    } else {
      const currUserId = parseInt(req.params.currUserId.trim());
      try {
        const followers = await getFollowers(currUserId);
        if (followers.length === 0) {
          const userExists = await getUserById(currUserId);
          if (userExists === 'no match') {
            handleError(res, 'user does not exist');
          } else {
            handleSuccess(res, 'followers', followers);
          }
        } else {
          handleSuccess(res, 'followers', followers);
        }
      } catch (err) {
        handleError(res, err);
      }
    }
});

// createFollow: make new follow relationship
router.post("/:currUserId/:targetUserId", async (req, res) => {
    const paramsCheck = checkIdParams(req);
    if (paramsCheck) {
      handleError(res, `invalid ${paramsCheck} parameter(s)`);
    } else {
      const currUserId = parseInt(req.params.currUserId.trim());
      const targetUserId = parseInt(req.params.targetUserId.trim());
      const password = req.body.password.trim() || req.body.password;
      let authorized = null;
      try {
        authorized = await authenticateUser(currUserId, password);
      } catch(err) {
        handleError(res, "error during authentication query");
      }
      if (authorized) {
        try {
          const test = await checkFollowExists(currUserId, targetUserId);
          if (test) {
            handleError(res, 'follow already exists');
          } else {
            const response = await createFollow(currUserId, targetUserId);
            res.json({
                status: "success",
                message: "follow created",
                payload: response
            });
          }
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
router.patch("/:currUserId/:targetUserId", async (req, res) => {
    const paramsCheck = checkIdParams(req);
    if (paramsCheck) {
      handleError(res, `invalid ${paramsCheck} parameter(s)`);
    } else {
      const currUserId = parseInt(req.params.currUserId.trim());
      const targetUserId = parseInt(req.params.targetUserId.trim());
      const password = req.body.password.trim() || req.body.password;
      let authorized = null;
      try {
        authorized = await authenticateUser(userId, password);
      } catch(err) {
        handleError(res, "error during authentication query");
      }
      if (authorized) {
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
