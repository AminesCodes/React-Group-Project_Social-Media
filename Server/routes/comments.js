const express = require('express');
const router = express.Router();

const {
    getAllCommentsByPostId,
    addCommentToPost,
    editComment,
    deleteComment
} = require('../queries/comments');

const { authenticateUser } = require('../queries/authentication')

const handleError = (response, err) => {
    if (err.message === "No data returned from the query.") {
        response.status(404)
        response.json({
            status: 'fail',
            message: 'Unexpected route',
            payload: null,
        })
    } else if (err.constraint === 'comments_post_id_fkey') {
        response.status(404)
        response.json({
            status: 'fail',
            message: 'Wrong route',
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

const isValidId = (id) => {
    if (!isNaN(parseInt(id)) && id.length === (parseInt(id) + '').length) {
        return true
    }
    return false
}

const isUserAllowed = async (response, id, password) => {
    try {
        return await authenticateUser(id, password)
    } catch (err) {
        console.log(err)
        if (err.message === "No data returned from the query.") {
            return false
        } else {
            handleError(response, err)
        }
    }
}

// GET ALL COMMENTS BY POST ID
router.get('/:postId', async (request, response) => {
    const postId = request.params.postId;
    const validId = isValidId(postId);

    if (!validId) {
        response.status(404)
            response.json({
                status: 'fail',     
                message: 'Wrong route',
                payload: null,
            })
    } else {
        try {
            const allCommentsByPostId = await getAllCommentsByPostId(postId);
            if (allCommentsByPostId.length) {
                response.json({
                    status: 'success',
                    message: `Successfully retrieved all comments related to the post: ${postId}`,
                    payload: allCommentsByPostId,
                })
            } else {
                response.status(400)
                response.json({
                    status: 'fail',
                    message: 'Wrong Route',
                    payload: null,
                })
            }
        } catch (err) {
            handleError(response, err)
        }
    }
})


// ADD A COMMENT TO A SPECIFIC POST
router.post('/:postId/:userId', async (request, response) => {
    const postId = request.params.postId;
    const userId = request.params.userId;
    const { password, body } = request.body;
    const validPostId = isValidId(postId);
    const validUserId = isValidId(userId);

    if (!validPostId || !validUserId) {
        response.status(404)
        response.json({
            status: 'fail',     
            message: 'Wrong route',
            payload: null,
        })
    } else if (!password || !body) {
        response.status(400)
        response.json({
            status: 'fail',
            message: 'Missing Information',
            payload: null,
        })
    } else {
        try {
            const userAllowed = await isUserAllowed(response, userId, password)
            if (!userAllowed) {
                response.status(401)
                    response.json({
                        status: 'fail',
                        message: 'Authentication issue',
                        payload: null,
                    })
            } else {
                try {
                    const addComment = await addCommentToPost(postId, userId, body);
                    response.status(201)
                    response.json({
                        status: 'success',
                        message: `Successfully added a comment to the post: ${postId}`,
                        payload: addComment,
                    })
                } catch (err) {
                    handleError(response, err)
                }
            }
        } catch (err) {
            handleError(response, err)
        }
    }
})


// EDIT A COMMENT
router.put('/:commentId/:userId', async (request, response) => {
    const commentId = request.params.commentId;
    const userId = request.params.userId;
    const { password, body } = request.body;
    const validCommentId = isValidId(commentId);
    const validUserId = isValidId(userId);

    if (!validCommentId || !validUserId) {
        response.status(404)
        response.json({
            status: 'fail',     
            message: 'Wrong route',
            payload: null,
        })
    } else if (!password || !body) {
        response.status(400)
        response.json({
            status: 'fail',
            message: 'Missing Information',
            payload: null,
        })
    } else {
        try {
            const userAllowed = await isUserAllowed(response, userId, password)
            if (!userAllowed) {
                response.status(401)
                    response.json({
                        status: 'fail',
                        message: 'Authentication issue',
                        payload: null,
                    })
            } else {
                try {
                    const editExistingComment = await editComment(commentId, body);
                    response.json({
                        status: 'success',
                        message: `Successfully updated the comment: ${commentId}`,
                        payload: editExistingComment,
                    })
                } catch (err) {
                    handleError(response, err)
                }
            }
        } catch (err) {
            handleError(response, err)
        }
    }
})


// DELETE A COMMENT
router.patch('/:commentId/:userId', async (request, response) => {
    const commentId = request.params.commentId;
    const userId = request.params.userId;
    const { password, body } = request.body;
    const validCommentId = isValidId(commentId);
    const validUserId = isValidId(userId);

    if (!validCommentId || !validUserId) {
        response.status(404)
        response.json({
            status: 'fail',     
            message: 'Wrong route',
            payload: null,
        })
    } else if (!password || !body) {
        response.status(400)
        response.json({
            status: 'fail',
            message: 'Missing Information',
            payload: null,
        })
    } else {
        try {
            const userAllowed = await isUserAllowed(response, userId, password)
            if (!userAllowed) {
                response.status(401)
                    response.json({
                        status: 'fail',
                        message: 'Authentication issue',
                        payload: null,
                    })
            } else {
                try {
                    const deleteExistingComment = await deleteComment(commentId);
                    response.json({
                        status: 'success',
                        message: `Successfully deleted the comment: ${commentId}`,
                        payload: deleteExistingComment,
                    })
                } catch (err) {
                    handleError(response, err)
                }
            }
        } catch (err) {
            handleError(response, err)
        }
    }
})


module.exports = router