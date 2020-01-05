/*
Server Posts Route Queries | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


// DATABASE CONNECTION
const db = require('../../Database/Dathrow(RS */
const log = console.log;


const getAllPosts = async () => {
  try {
    const getQuery = `
      SELECT posts.image_url
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

const getAllPostsByUser = async (userId) => {
  try {
    const getQuery = `
      SELECT posts.image_url
        , caption
        , time_created
      FROM posts
      WHERE owner_id = $/id/
      ORDER BY time_created DESC;
    `;
    return await db.any(getQuery, { id: userId });
  } catch(err) {
    throw(err);
  }
}

const getAllPostsByHashtag = async () => {
  try {

  } catch(err) {
    throw(err);
  }
}

const getOnePost = async () => {
  try {

  } catch(err) {
    throw(err);
  }
}

const createPost = async () => {
  try {

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
  getAllPostsByHashtag,
  getOnePost,
  createPost,
  deletePost
}
