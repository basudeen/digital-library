//const dayjs = require('dayjs');
const book = require('../models/Book_Schema');
const { SUCCESS, CREATE, BAD_REQUEST, NODATA, INNERNAL_SERVER } = require('../constants/StatusCode');
const { AUTHOR_CREATED, AUTHOR_UPDATED, AUTHOR_DELETED,
    BOOK_CREATED, BOOK_UPDATED, BOOK_DELETED, FETCHED } = require('../constants/Message');
const { AUTHOR_NOT_CREATED, AUTHOR_NOT_UPDATED, AUTHOR_NOT_DELETED,
    BOOK_NOT_CREATED, BOOK_NOT_UPDATED, BOOK_NOT_DELETED, NOT_FETCHED, INTERNAl_SERVER_ERROR } = require('../constants/ErrorMessage');

module.exports = {
    Createbook: async (req, res) => {
        try {
            const Createbook = await book.create(req.body);
            if (!Createbook) res.status(BAD_REQUEST).json({ success: false, message: BOOK_NOT_CREATED });
            else
                res.status(CREATE).json({ success: true, message: BOOK_CREATED });
        }
        catch (error) {
            res.status(INNERNAL_SERVER).json({ success: true, message: INTERNAl_SERVER_ERROR, error: error.message });
        }
    }
}