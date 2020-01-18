const db = require('../db');

const getAllEventsByEventId = async (eventId) => {
    try {
        const requestQuery = `
            SELECT *
            FROM events
            WHERE post_id = $1
            ORDER BY events.id ASC`
        return await db.any(requestQuery, eventId)
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllEventsByEventId
}