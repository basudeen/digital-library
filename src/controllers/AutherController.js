const auth = require('../models/Auther_Schema');
const dayjs = require('dayjs');
const { SUCCESS, CREATE, BAD_REQUEST, NODATA, INNERNAL_SERVER } = require('../constants/StatusCode');
const { AUTHOR_CREATED, AUTHOR_UPDATED, AUTHOR_DELETED,
    BOOK_CREATED, BOOK_UPDATED, BOOK_DELETED, FETCHED } = require('../constants/Message');
const { AUTHOR_NOT_CREATED, AUTHOR_NOT_UPDATED, AUTHOR_NOT_DELETED,
    BOOK_NOT_CREATED, BOOK_NOT_UPDATED, BOOK_NOT_DELETED, NOT_FETCHED, INTERNAl_SERVER_ERROR } = require('../constants/ErrorMessage');
const { get } = require('mongoose');
module.exports = {
    Createauthor: async (req, res) => {
        try {
            const Createauthor = auth.create(req.body);
            if (!Createauthor) res.status(BAD_REQUEST).json({ success: false, message: AUTHOR_NOT_CREATED });
            else
                res.status(CREATE).json({ success: true, message: AUTHOR_CREATED });
        }
        catch (error) {
            res.status(INNERNAL_SERVER).json({ success: true, message: INTERNAl_SERVER_ERROR, error: error });
        }
    },
    Getauthor: async (req, res) => {
        try {
            const getauthor = await auth.find({},{__v:0}).lean();
            if (!getauthor) res.status(NODATA).json({ success: false, message: NOT_FETCHED });
            else {
                getauthor[0].createdAt = dayjs(getauthor.createdAt).format("DD-MM-YYYY");
                getauthor[0].birthDate = dayjs(getauthor[0].birthDate).format("DD-MM-YYYY");
                getauthor[0].updatedAt = dayjs(getauthor[0].updatedAt).format("DD-MM-YYYY");
                res.status(SUCCESS).json({ success: true, message: FETCHED, data: getauthor })
            };
        }
        catch (error) {
            console.log(error,"3333");
            res.status(INNERNAL_SERVER).json({ success: true, message: INTERNAl_SERVER_ERROR, error: error });
        }
    },
}