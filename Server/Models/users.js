const db = require('../Database/database');

const formatStringInputs = (str) => {
    str = str.trim()
    const arr = str.split(' ')
    let outputStr = '';
    for (let word of arr) {
        if (word && typeof word === 'string' && word !== ' ') {
            outputStr += word[0].toUpperCase() + (word.slice(1, word.length)).toLowerCase() + ' ';
        }
    }
    if (outputStr) {
        return outputStr;
    }
    return str;
}

// CREATING THE USER
const createUser = async (user) => {
    try {
        let { username, firstname, lastname, dob, password, email } = user;

        username = username.toLowerCase();
        firstname = formatStringInputs(firstname);
        lastname = formatStringInputs(lastname);
        email = email.toLowerCase();

      const insertQuery = `
        INSERT INTO users
            (username, avatar_url, firstname, lastname, dob, user_password, email)
        VALUES
            ($1, $2, $3, $4, $5, $6) 
        RETURNING *
        `;
      let newUser = await db.one(insertQuery, [username, firstname, lastname, dob, password, email])
      delete newUser.user_password
      return newUser;
    } catch (err) {
        throw err;
    }
  }

const getUserByUsername = async (username) => {
    try {
        const requestQuery = `
            SELECT id, username, firstname, lastname, dob, email, signing_date
            FROM users
            WHERE username = $1
        `
        const user = await db.one(requestQuery, username);
        return user;
    } catch (err) {
        if (err.message === 'No data returned from the query') {
            return 'No Match'
        }
        throw err;
    }
}

const getUserById = async (id) => {
    try {
        const requestQuery = `
            SELECT id, username, firstname, lastname, dob, email, signing_date
            FROM users
            WHERE id = $1
        `
        const user = await db.one(requestQuery, id);
        return user;
    } catch (err) {
        if (err.message === 'No data returned from the query') {
            return 'No Match'
        }
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const requestQuery = `
            SELECT id, username, firstname, lastname, dob, email, signing_date
            FROM users
        `
        const users = await db.any(requestQuery);
        return users;
    } catch (err) {
        throw err;
    }
}

const updateUserInfo = async (userId, user) => {
    try {
        let { username, firstname, lastname, dob, email } = user;
        username = username.toLowerCase();
        firstname = formatStringInputs(firstname);
        lastname = formatStringInputs(lastname);
        email = email.toLowerCase();

        const updateQuery = `UPDATE users 
        SET username=$1, firstname=$2, lastname=$3, dob=$4, email=$5
        WHERE id = $6 
        RETURNING id, username, firstname, lastname, dob, email, signing_date
        `
        const updatedUser = await db.one(updateQuery, [username, firstname, lastname, dob, email, userId])
        return updatedUser;
    } catch (err) {
        throw err;
    }
}


const updateUserPassword = async (userId, password) => {
    try {
        const updateQuery = `UPDATE users 
        SET user_password = $1
        WHERE id = $2 
        RETURNING *
        `
        const user = await db.one(updateQuery, [password, userId])
        return user;
    } catch (err) {
        throw err;
    }
}

const deleteUser = async (userId) => {
    try {
        const deleteQuery = `delete from users
        WHERE id = $1 
        RETURNING id, username, signing_date
        `
        const user = await db.one(deleteQuery, userId)
        return user;
    } catch (err) {
        throw err;
    }
}

const authenticateUser = async (userId, password) => {
    try {
        const requestQuery = `
        Select user_password FROM users WHERE id = $1
        `
        const targetUser = await db.one(requestQuery, userId)
        if (password === targetUser.user_password) {
            return true
        }
        return false
    } catch (err) {
        throw err;
    }
}

const logUser = async (email, password) => {
    try {
        email = email.toLowerCase();
        const requestQuery = `
        Select * FROM users WHERE email = $1
        `
        const registeredUser = await db.one(requestQuery, email)
        if (password === registeredUser.user_password) {
            delete registeredUser.user_password
            return registeredUser
        }
        return false
    } catch (err) {
        if (err.message) {
            if (err.message === 'No data returned from the query.') {
                return false;
            }
        }
        throw err;
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    getAllUsers,
    updateUserInfo,
    updateUserPassword,
    deleteUser,
    authenticateUser,
    logUser
  }