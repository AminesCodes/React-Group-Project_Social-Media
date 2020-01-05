const express = require('express');
const router = express.Router();

const Express = require('express');
const Router = Express.Router();

const Users = require('../Models/users');


Router.get('/all', async (request, response) => {
    try {
        const allUsers = await Users.getAllUsers();
        response.json({
            status: 'success',
            message: 'Successfully retrieved all users',
            payload: allUsers,
        })
    } catch (err) {
        console.log(err)
        response.status(500)
        response.json({
            status: 'fail',
            message: 'Sorry, Something Went Wrong (BE)',
            payload: null
        })
    }
})

Router.get('/:username', async (request, response) => {
    const username = request.params.username
    let userId = false

    if (!isNaN(parseInt(username)) && username.length === (parseInt(username) + '').length) {
        userId = username
    }

    if (userId) {
        try {
            const targetUser = await Users.getUserById(userId);
            response.json({
                status: 'success',
                message: `Successfully retrieved the user with id ${userId}`,
                payload: targetUser,
            })
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'fail',
                message: 'Sorry, Something Went Wrong (BE)',
                payload: null,
            })
        }
    } else {
        try {
            const targetUser = await Users.getUserByUsername(username.toLowerCase());
            response.json({
                status: 'success',
                message: `Successfully retrieved user: ${username}`,
                payload: targetUser,
            })
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'fail',
                message: 'Sorry, Something Went Wrong (BE)',
                payload: null,
            })
        }
    }
})


// Login a registered user
Router.patch('/login', async (request, response) => {
    let { password, email } = request.body
    
    if (!password || !email) {
        response.status(400)
        response.json({
            status: 'fail',
            message: 'Missing Information',
            payload: null,
        })
    } else {
        try {
            const userToLog = await Users.logUser(email, password)
            if (userToLog) {
                response.json({
                    status: 'success',
                    message: 'Successfully logged user',
                    payload: userToLog,
                })
            } else {
                response.status(401)
                response.json({
                    status: 'fail',
                    message: 'Bad Combination email/password',
                    payload: null,
                })
            }
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'fail',
                message: 'Sorry, something went wrong',
                payload: null,
            })
        }
    }
})


Router.post('/signup', async (request, response) => {
    const { username, firstname, lastname, dob, password, email } = request.body

    if (!username || !firstname || !lastname || !dob || !password || !email) {
        response.status(400)
            response.json({
                status: 'fail',
                message: 'Missing Information',
                payload: null,
            })
    } else {
        try {
            const newUser = await Users.createUser(request.body)
            response.json({
                status: 'success',
                message: 'Successfully signed up',
                payload: newUser,
            })
        } catch (err) {
            // Username already taken 
            if (err.code === "23505" && err.detail.includes("already exists")) {
                console.log('Attempt to register a new user with a taken email/username')
                response.status(403)
                response.json({
                    status: 'fail',
                    message: 'Username already taken AND/OR email address already registered',
                    payload: null,
                })
            } else {
                console.log(err)
                response.status(500)
                response.json({
                    status: 'fail',
                    message: 'Sorry, Something Went Wrong (BE)',
                    payload: null,
                })
            }
        }
    }
})

Router.put('/:userId', async (request, response) => {
    const userId = request.params.userId;
    const { username, firstname, lastname, dob, password, email } = request.body

    if (username === 'undefined' || !username || !firstname || !lastname || !dob || !password || !email) {
        response.status(400)
            response.json({
                status: 'fail',
                message: 'Missing Information or invalid username',
                payload: null,
            })
    } else {
        try {
            const authorizedToUpdate = await Users.authenticateUser(userId, password)

            if (authorizedToUpdate) {
                try {
                    const updatedUser = await Users.updateUserInfo(userId, request.body)
                    response.json({
                        status: 'success',
                        message: 'Successfully update information',
                        payload: updatedUser,
                    })
                } catch (err) {
                    console.log(err)
                    response.status(500)
                    response.json({
                        status: 'fail',
                        message: 'Sorry, Something Went Wrong (BE)',
                        payload: null,
                    })
                }
            } else {
                console.log('Authentication issue')
                response.status(401)
                response.json({
                    status: 'fail',
                    message: 'Authentication issue',
                    payload: null,
                })
            }
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'fail',
                message: 'Sorry, Something Went Wrong (BE)',
                payload: null,
            })
        }
    }
})


Router.patch('/:userId/password', async (request, response) => {
    const userId = request.params.userId;
    const { oldPassword, newPassword, confirmedPassword } = request.body

    if (!oldPassword || !newPassword || !confirmedPassword || newPassword !== confirmedPassword) {
        response.status(400)
            response.json({
                status: 'fail',
                message: 'Missing Information',
                payload: null,
            })
    } else {
        try {
            const authorizedToUpdate = await Users.authenticateUser(userId, oldPassword)

            if (authorizedToUpdate) {
                try {
                    const updatedUser = await Users.updateUserPassword(userId, newPassword)
                    response.json({
                        status: 'success',
                        message: 'Successfully updated the password',
                        payload: updatedUser,
                    })
                } catch (err) {
                    console.log(err)
                    response.status(500)
                    response.json({
                        status: 'fail',
                        message: 'Sorry, Something Went Wrong (BE)',
                        payload: null,
                    })
                }
            } else {
                console.log('Authentication issue')
                response.status(401)
                response.json({
                    status: 'fail',
                    message: 'Authentication issue',
                    payload: null,
                })
            }
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'fail',
                message: 'Sorry, Something Went Wrong (BE)',
                payload: null,
            })
        }
    }
})


Router.patch('/:userId/delete', async (request, response) => {
    const userId = request.params.userId;
    const { password } = request.body

    if (!password) {
        response.status(400)
            response.json({
                status: 'fail',
                message: 'Missing Information',
                payload: null,
            })
    } else {
        try {
            const authorizedToUpdate = await Users.authenticateUser(userId, password)

            if (authorizedToUpdate) {
                try {
                    const deletedUser = await Users.deleteUSer(userId)
                    response.json({
                        status: 'success',
                        message: 'Successfully delete user',
                        payload: deletedUser,
                    })
                } catch (err) {
                    console.log(err)
                    response.status(500)
                    response.json({
                        status: 'fail',
                        message: 'Sorry, Something Went Wrong (BE)',
                        payload: null,
                    })
                }
            } else {
                console.log('Authentication issue')
                response.status(401)
                response.json({
                    status: 'fail',
                    message: 'Authentication issue',
                    payload: null,
                })
            }
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'fail',
                message: 'Sorry, Something Went Wrong (BE)',
                payload: null,
            })
        }
    }
})

module.exports = Router


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
