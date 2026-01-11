const book = require('../models/Book_Schema');
const convertdateformat = require('../utils/common');

const { SUCCESS, CREATE, BAD_REQUEST, NODATA, INTERNAL_SERVER } = require('../constants/StatusCode');
const { BOOK_CREATED, BOOK_UPDATED, BOOK_DELETED, FETCHED } = require('../constants/Message');
const { BOOK_NOT_CREATED, BOOK_NOT_UPDATED, BOOK_NOT_DELETED, NOT_FETCHED, INTERNAl_SERVER_ERROR } = require('../constants/ErrorMessage');


module.exports = {
    Createbook: async (req, res) => {
        // try {
            const Createbook = await book.create(req.body);
            if (!Createbook) res.status(BAD_REQUEST).json({ success: false, message: BOOK_NOT_CREATED });
            else
                res.status(CREATE).json({ success: true, message: BOOK_CREATED });
        // }
        // catch (error) {
        //     res.status(INTERNAL_SERVER).json({ success: true, message: INTERNAl_SERVER_ERROR, error: error.message });
        // }
    },
    GetBook: async (req, res) => {
        // try {
            let getbook = await book.find({}, { __v: 0 }).lean();
            if (!getbook) return res.status(NODATA).json({ success: false, message: NOT_FETCHED, data: [] });
            else {
                getbook[0].createdAt = await convertdateformat(getbook[0].createdAt);
                getbook[0].updatedAt = await convertdateformat(getbook[0].updatedAt);
                res.status(SUCCESS).json({ success: true, message: FETCHED, data: getbook });
            }
        // }
        // catch (error) {
        //     console.error(error);
        //     res.status(INTERNAL_SERVER).json({ success: false, message: INTERNAl_SERVER_ERROR });
        // }
    },
    UpdateBook: async (req, res) => {
        // try {
            let { id } = req.params;
            let { title, summary, author, isbn, genre, publishedYear } = req.body;
            let data = {};
            if (title != undefined) data.title = title;
            if (author != undefined) data.author = author;
            if (summary != undefined) data.summary = summary;
            if (isbn != undefined) data.isbn = isbn;
            if (genre != undefined) data.genre = genre;
            if (publishedYear != undefined) data.publishedYear = publishedYear;
            const updateBook = await book.findByIdAndUpdate(id, data, { new: true });
            if (!updateBook) return res.status(BAD_REQUEST).json({ success: false, message: BOOK_NOT_UPDATED, data: [] });
            else res.status(SUCCESS).json({ success: true, message: BOOK_UPDATED, data: [] })
        // }
        // catch (error) {
        //     console.error(error);
        //     res.status(INTERNAL_SERVER).json({ success: false, message: INTERNAl_SERVER_ERROR });
        // }
    },
    DeleteBook: async (req, res) => {
        // try {
            let { id } = req.params;
            const removebook = await book.findByIdAndDelete(id);
            if (!removebook) return res.status(BAD_REQUEST).json({ success: false, message: BOOK_NOT_DELETED });
            else res.status(SUCCESS).json({ success: true, message: BOOK_DELETED, data: [] });
        // }
        // catch (error) {
        //     console.error(error);
        //     res.status(INTERNAL_SERVER).json({ success: false, message: INTERNAl_SERVER_ERROR });
        // }
    }
}