/*
Server Posts Route Queries | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// DATABASE CONNECTION
const db = require('../../Database/Database.js');


const getAllPosts = async () => {
  try {
    const getQuery = `
      SELECT image_url
        , caption
        , time_created
        , username
      FROM posts INNER JOIN users ON (posts.owner_id = users.id)
      ORDER BY posts.time_created DESC;
    `;
    return await db.any(getQuery);
  } catch(err) {
    throw(err);
  }
}

const getAllPostsByUser = async (numId) => {
  try {
    const getQuery = `
      SELECT image_url
        , caption
        , time_created
      FROM posts
      WHERE owner_id = $/id/
      ORDER BY time_created DESC;
    `;
    return await db.any(getQuery, { id: numId });
  } catch(err) {
    throw(err);
  }
}

const getAllPostsByHashtag = async (strTag) => {
  try {
    const getQuery = `
      SELECT image_url
        , caption
        , time_created
        , username
      FROM posts INNER JOIN users ON (posts.owner_id = users.id)
      WHERE hashtag_str LIKE $/hashStr/
      ORDER BY posts.time_created DESC;
    `;
    return await db.any(getQuery, { hashStr: `%${strTag}%` });
  } catch(err) {
    throw(err);
  }
}

const getOnePost = async (numId) => {
  try {
    const getQuery = `
      SELECT image_url
        , caption
        , time_created
      FROM posts
      WHERE id = $/id/
    `;
    return await db.one(getQuery, { id: numId });
  } catch(err) {
    throw(err);
  }
}

const createPost = async (bodyObj) => {
  try {
    const postQuery = `
      INSERT INTO posts (image_url
        , caption
        , owner_id
        , hashtag_str
      ) VALUES ($/imageUrl/
        , $/caption/
        , $/ownerId/
        , $/hashtagString/
      ) RETURNING *;
    `;
    return await db.one(postQuery, bodyObj);
  } catch(err) {
    throw(err);
  }
}

const deletePost = async () => {
  try {

  } catch(err) {
    throw(err);
  }
}



/* EXPORT */
module.exports = {
  getAllPosts,
  getAllPostsByUser,
  getAllPostsByHashtag,
  getOnePost,
  createPost,
  deletePost
}
