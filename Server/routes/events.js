/*
Posts Route | Server | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/

const express = require('express');
const router = express.Router();

const {
    getAllEventsByEventId
} = require('../queries/events');

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

// GET ALL EVENTS BY EVENT ID

router.get('/event/all/:eventId', async (request, response) => {
    const eventId = request.params.eventId;
    const validId = isValidId(eventId);

    if (!validId) {
        response.status(404)
            response.json({
                status: 'fail',     
                message: 'Wrong route',
                payload: null,
            })
    } else {
        try {
            const allEventsByEventId = await getAllEventsByEventId(eventId);
            if (allEventsByEventId.length) {
                response.json({
                    status: 'success',
                    message: `Successfully retrieved all reactions related to the post: ${eventId}`,
                    payload: allEventsByEventId,
                })
            } else {
                response.json({
                    status: 'success',
                    message: 'No reactions returned.',
                    payload: [],
                })
            }
        } catch (err) {
            handleError(response, err)
        }
    }
})


module.exports = router