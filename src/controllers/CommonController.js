const auth = require('../models/Auther_Schema');
const book = require('../models/Book_Schema');
const convertdateformat = require('../utils/common');

const { SUCCESS, CREATE, BAD_REQUEST, NODATA, INTERNAL_SERVER } = require('../constants/StatusCode');
const { AUTHOR_CREATED, AUTHOR_UPDATED, AUTHOR_DELETED,
    BOOK_CREATED, BOOK_UPDATED, BOOK_DELETED, FETCHED } = require('../constants/Message');
const { AUTHOR_NOT_CREATED, AUTHOR_NOT_UPDATED, AUTHOR_NOT_DELETED,
    BOOK_NOT_CREATED, BOOK_NOT_UPDATED, BOOK_NOT_DELETED, NOT_FETCHED, INTERNAl_SERVER_ERROR } = require('../constants/ErrorMessage');

module.exports = {
    GetAuthorBooks: async (req, res) => {
        try {
            let result = await book.aggregate([{
                $lookup: {
                    from: 'authors',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author_details'
                }
            },
            { $unwind: "$author_details" },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    summary: 1,
                    author: 1,
                    isbn: 1,
                    genre: 1,
                    publishedYear: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%d-%m-%Y',
                            date: '$createdAt'
                        }
                    },
                    updatedAt: {
                        $dateToString: {
                            format: '%d-%m-%Y',
                            date: '$updatedAt'
                        }
                    },
                    author_details: {
                        name: "$author_details.name",
                        bio: "$author_details.bio",
                        website: "$author_details.website",
                        birthDate: {
                            $dateToString: {
                                format: "%d-%m-%Y ",
                                date: "$author_details.birthDate"
                            }
                        },
                        createdAt: {
                            $dateToString: {
                                format: "%d-%m-%Y ",
                                date: "$author_details.createdAt"
                            }
                        },
                        updatedAt: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$author_details.updatedAt"
                            }
                        },
                    }
                }
            }
            ]);


            if (!result) return res.status(NODATA).json({ success: false, message: NOT_FETCHED, data: [] });
            else res.status(SUCCESS).json({ success: true, message: FETCHED, data: result });
        }
        catch (error) {
            console.error(error.message);
            res.status(INTERNAL_SERVER).json({ success: false, message: INTERNAl_SERVER_ERROR })
        }
    }
}