/*
Server Follows Route Queries | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// DATABASE CONNECTION
const db = require('../db');


const getFollows = async (currentUserId) => {
  try {
    const getQuery = `
      SELECT username AS followings
        , avatar_url
      FROM follows INNER JOIN users ON (follows.followed_user_id = users.id)
      WHERE follower_id = $/id/
      ORDER BY username ASC;
    `;
    return await db.any(getQuery, { id: currentUserId });
  } catch(err) {
    throw(err);
  }
}

const getFollowers = async (currentUserId) => {
  try {
    const getQuery = `
      SELECT username AS followers
        , avatar_url
      FROM follows INNER JOIN users ON (follows.follower_id = users.id)
      WHERE followed_user_id = $/id/
      ORDER BY username ASC;
    `;
    return await db.any(getQuery, { id: currentUserId });
  } catch(err) {
    throw(err);
  }
}

const createFollow = async (currentUserId, targetUserId) => {
  try {
    const postQuery = `
      INSERT INTO follows (follower_id
        , followed_user_id
      ) VALUES ($/currentUserId/
        , $/targetUserId/
      ) RETURNING *;
    `;
    return await db.one(postQuery, { currentUserId, targetUserId });
  } catch(err) {
    throw(err);
  }
}

const deleteFollow = async (currentUserId, targetUserId) => {
  try {
    const deleteQuery = `
      DELETE FROM follows
      WHERE follower_id = $/currentUserId/
        AND followed_user_id = $/targetUserId/
      RETURNING *;
    `;
    return await db.one(deleteQuery, { currentUserId, targetUserId });
  } catch(err) {
    throw(err);
  }
}


/* EXPORT */
module.exports = {
  getFollows,
  getFollowers,
  createFollow,
  deleteFollow
}
