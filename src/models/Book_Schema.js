const mongoose = require('mongoose');
const Book = new mongoose.Schema({
    title: {
        type: String,
        required : true,
        maxLength:100
    },
    summary:{
        type : String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    },
    isbn:{
        type:String,
        required:true,
        unique:true,
    },
    genre:{
        type:String,
        enum:['Fiction','Horror','Comdey','Drama']
    },
    publishedYear:{
        type:Number,
        min:1000,
        max:2026
    }
}, { timestamps: true });

module.exports= mongoose.model('Book',Book);