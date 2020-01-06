/*
Server Follows Route Queries | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// DATABASE CONNECTION
const db = require('../../Database/Database.js');


const getFollows = async (numId) => {
  try {
    const getQuery = `
      SELECT username AS followings
        , avatar_url
      FROM follows INNER JOIN users ON (follows.followed_user_id = users.id)
      WHERE follower_id = $/id/
      ORDER BY username ASC;
    `;
    return await db.any(getQuery, { id: numId });
  } catch(err) {
    throw(err);
  }
}

const getFollowers = async (numId) => {
  try {
    const getQuery = `
      SELECT username AS followers
        , avatar_url
      FROM follows INNER JOIN users ON (follows.follower_id = users.id)
      WHERE followed_user_id = $/id/
      ORDER BY username ASC;
    `;
    return await db.any(getQuery, { id: numId });
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

const deleteFollow = async (numId) => {
  try {
    // const deleteQuery = `
    //   DELETE FROM follows
    //   WHERE id = $/id/
    //   RETURNING *;
    // `;
    // return await db.one(deleteQuery, { id: numId });
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
