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
const handleError = (res, error, code) => {
  console.log(code ? `error(fe): ${error}` : `error(be): ${error}`);
  res.status(code || 500);
  res.json({
      status: "fail",
      message: code ? `error: ${error}` : `error(backend): ${error}`,
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
      handleError(res, 'invalid currUserId parameter', 400);
    } else {
      const currUserId = parseInt(req.params.currUserId.trim());
      try {
        const follows = await getFollows(currUserId);
        if (follows.length === 0) {
          const userExists = await getUserById(currUserId);
          if (userExists === 'no match') {
            handleError(res, 'user does not exist', 400);
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
      handleError(res, 'invalid currUserId parameter', 400);
    } else {
      const currUserId = parseInt(req.params.currUserId.trim());
      try {
        const followers = await getFollowers(currUserId);
        if (followers.length === 0) {
          const userExists = await getUserById(currUserId);
          if (userExists === 'no match') {
            handleError(res, 'user does not exist', 400);
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
      handleError(res, `invalid ${paramsCheck} parameter(s)`, 400);
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
        handleError(res, "error during authentication query");
      }
      if (authorized) {
        try {
          const followExists = await checkFollowExists(currUserId, targetUserId);
          if (followExists) {
            handleError(res, 'follow already exists', 403);
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
        handleError(res, 'authentication issue', 401);
      }
    }
});

// deleteFollow: delete follow relationship
router.patch("/delete/:currUserId/:targetUserId", async (req, res) => {
    const paramsCheck = checkIdParams(req);
    if (paramsCheck) {
      handleError(res, `invalid ${paramsCheck} parameter(s)`, 400);
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
        handleError(res, "error during authentication query");
      }
      if (authorized) {
        try {
          const followExists = await checkFollowExists(currUserId, targetUserId);
          if (!followExists) {
            handleError(res, 'follow does not exist', 400);
          } else {
            const response = await deleteFollow(currUserId, targetUserId);
            res.json({
                status: "success",
                message: "follow deleted",
                payload: response
            });
          }
        } catch (err) {
          handleError(res, err);
        }
      } else {
        handleError(res, 'authentication issue', 401);
      }
    }
});


/* EXPORT */
module.exports = router;
