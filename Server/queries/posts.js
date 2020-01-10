/*
Server Posts Route Queries | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// DATABASE CONNECTION
const db = require('../db');


const getAllPosts = async (offset) => {
  try {
    const getQuery = `
      SELECT username
        , posts.time_created
        , image_url
        , caption
        , hashtag_str
      FROM posts INNER JOIN users ON (posts.owner_id = users.id)
      ORDER BY posts.time_created DESC
      LIMIT 10 OFFSET $/offset/;
    `;
    return await db.any(getQuery, { offset });
  } catch(err) {
    throw(err);
  }
}

const getAllPostsByUser = async (numId, offset) => {
  try {
    const getQuery = `
      SELECT time_created
        , image_url
        , caption
        , hashtag_str
      FROM posts
      WHERE owner_id = $/id/
      ORDER BY time_created DESC
      LIMIT 10 OFFSET $/offset/;
    `;
    return await db.any(getQuery, { id: numId, offset });
  } catch(err) {
    throw(err);
  }
}

const getAllPostsByHashtags = async (hashArr, offset) => {
  try {
    const getQuery = `
      SELECT username
        , posts.time_created
        , image_url
        , caption
        , hashtag_str
      FROM posts INNER JOIN users ON (posts.owner_id = users.id)
      WHERE hashtag_str ILIKE ANY($/hashArr/)
      ORDER BY posts.time_created DESC
      LIMIT 10 OFFSET $/offset/;
    `;
    return await db.any(getQuery, { hashArr, offset });
  } catch(err) {
    throw(err);
  }
}

const getOnePost = async (numId) => {
  try {
    const getQuery = `
      SELECT username
        , posts.time_created
        , image_url
        , caption
        , hashtag_str
      FROM posts INNER JOIN users ON (posts.owner_id = users.id)
      WHERE posts.id = $/id/
    `;
    return await db.one(getQuery, { id: numId });
  } catch(err) {
    throw(err);
  }
}

const createPost = async (bodyObj) => {
  try {
    const postQuery = `
      INSERT INTO posts (owner_id
        , caption
        , hashtag_str
      ) VALUES ($/ownerId/
        , $/caption/
        , $/formattedHashtags/
      ) RETURNING *;
    `;
    return await db.one(postQuery, bodyObj);
  } catch(err) {
    throw(err);
  }
}

const deletePost = async (numId) => {
  try {
    const deleteQuery = `
      DELETE FROM posts
      WHERE id = $/id/
      RETURNING *;
    `;
    return await db.one(deleteQuery, { id: numId });
  } catch(err) {
    throw(err);
  }
}


/* EXPORT */
module.exports = {
  getAllPosts,
  getAllPostsByUser,
  getAllPostsByHashtags,
  getOnePost,
  createPost,
  deletePost
}
