const express = require('express');
const router = express.Router();
const multer = require('multer');

const Users = require('../Models/users');

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, '../')
    cb(null, '../public/images/avatars')
  },
  filename: (request, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname
    cb(null, fileName)
  }
});

const fileFilter = (request, file, cb) => {
    if ((file.mimetype).slice(0, 6) === 'image/') {
        // request.file = file
        // request.file.path = file.path
        const avatarUrl = request.headers.host + '/images/avatars/' + file.originalname
        cb(null, true) 
        console.log(avatarUrl)
    } else {
        cb(null, false)
    }
}

const upload = multer({ 
        storage: storage,
        // fileFilter: fileFilter,
    });


router.get('/all', async (request, response) => {
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

router.get('/:username', async (request, response) => {
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
router.patch('/login', async (request, response) => {
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


router.post('/signup', async (request, response) => {
    const { username, firstname, lastname, password, email, ageCheck } = request.body

    if (!username || !firstname || !lastname || !password || !email || !ageCheck || ageCheck !== 'true') {
        response.status(400)
            response.json({
                status: 'fail',
                message: 'Missing Information, all fields are required',
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

// app.post('/upload', upload.single("image"), (req, res, next) => {
//   console.log('req.file', req.file)
//   console.log('req.body', req.body)
//   let imageUrl = "http://localhost:3129/" + req.file.path.replace('public/', '')
//   res.json({
//     imageUrl: imageUrl,
//     message: "file uploaded"
//   })
// })
router.put('/:userId', upload.single('avatar'), async (request, response) => {
    const userId = request.params.userId;
    const { username, firstname, lastname, password, email} = request.body

    if (isNaN(parseInt(userId)) || parseInt(userId) + '' !== userId) {
        response.status(404)
            response.json({
                status: 'fail',
                message: 'Wrong route',
                payload: null,
            })
    // } else if (username === 'undefined' || !username || !firstname || !lastname || !password || !email) {
    //     response.status(400)
    //         response.json({
    //             status: 'fail',
    //             message: 'Missing Information or invalid username',
    //             payload: null,
    //         })
    } else {
        console.log('Req.Body (Before)', request.body)
        avatarUrl = request.headers.host + '/images/avatars/' + request.file.originalname
        console.log('REQUEST.BODY (After)', request.file)
        let imageUrl = "http://localhost:3129/" + request.file.path.replace('/public/', '/')
        response.send(imageUrl)
        // try {
        //     if (request.body.bio) {
        //         request.body.bio = 'NULL'
        //     }

        //     const authorizedToUpdate = await Users.authenticateUser(userId, password)
        //     if (authorizedToUpdate) {
        //         try {
        //             const updatedUser = await Users.updateUserInfo(userId, request.body)
        //             response.json({
        //                 status: 'success',
        //                 message: 'Successfully update information',
        //                 payload: updatedUser,
        //             })
        //         } catch (err) {
        //             console.log(err)
        //             response.status(500)
        //             response.json({
        //                 status: 'fail',
        //                 message: 'Sorry, Something Went Wrong (BE)',
        //                 payload: null,
        //             })
        //         }
        //     } else {
        //         console.log('Authentication issue')
        //         response.status(401)
        //         response.json({
        //             status: 'fail',
        //             message: 'Authentication issue',
        //             payload: null,
        //         })
        //     }
        // } catch (err) {
        //     console.log(err)
        //     response.status(500)
        //     response.json({
        //         status: 'fail',
        //         message: 'Sorry, Something Went Wrong (BE)',
        //         payload: null,
        //     })
        // }
    }
})


router.patch('/:userId/password', async (request, response) => {
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


router.patch('/:userId/delete', async (request, response) => {
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

module.exports = router
