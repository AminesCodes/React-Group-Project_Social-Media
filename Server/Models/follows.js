/*
Server Follows Route Queries | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// DATABASE CONNECTION
const db = require('../../Database/Database.js');


const getFollows = async (numId) => {
  try {
    const getQuery = `
      SELECT followed_user_id
        , username
      FROM follows INNER JOIN users ON (follows.followed_user_id = users.id)
      WHERE follower_id = $/id/
      ORDER BY username ASC;
    `;
    return await db.any(getQuery, { id: numId });
  } catch(err) {
    throw(err);
  }
}

const getFollowings = async (numId) => {
  try {
    // const getQuery = `
    //   SELECT image_url
    //     , caption
    //     , time_created
    //   FROM follows
    //   WHERE owner_id = $/id/
    //   ORDER BY time_created DESC;
    // `;
    // return await db.any(getQuery, { id: numId });
  } catch(err) {
    throw(err);
  }
}

// const getAllPostsByHashtag = async (strTag) => {
//   try {
//     const getQuery = `
//       SELECT image_url
//         , caption
//         , time_created
//         , username
//       FROM follows INNER JOIN users ON (posts.owner_id = users.id)
//       WHERE hashtag_str LIKE $/hashStr/
//       ORDER BY posts.time_created DESC;
//     `;
//     return await db.any(getQuery, { hashStr: `%${strTag}%` });
//   } catch(err) {
//     throw(err);
//   }
// }

// const getOnePost = async (numId) => {
//   try {
//     const getQuery = `
//       SELECT image_url
//         , caption
//         , time_created
//       FROM follows
//       WHERE id = $/id/
//     `;
//     return await db.one(getQuery, { id: numId });
//   } catch(err) {
//     throw(err);
//   }
// }

const createFollow = async (bodyObj) => {
  try {
    // const postQuery = `
    //   INSERT INTO posts (image_url
    //     , caption
    //     , owner_id
    //     , hashtag_str
    //   ) VALUES ($/imageUrl/
    //     , $/caption/
    //     , $/ownerId/
    //     , $/hashtagString/
    //   ) RETURNING *;
    // `;
    // return await db.one(postQuery, bodyObj);
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
