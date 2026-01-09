const mongoose = require('mongoose');
require('dotenv').config();
const mongodb = mongoose.connect(process.env.MONGO_URI, { family: 4 }).then(() => {
    console.log('db connected Successfully');
})
    .catch(err => console.log("Error connecting to MongoDB", err)
    )
module.exports =mongodb;