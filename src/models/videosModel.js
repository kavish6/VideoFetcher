const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    publishedAt:{
        required:true,
        type:String
    },
    thumbnail:{
        required:true,
        type:String,
    },
    query:{
        required:true,
        type:String,
    }
})

module.exports = mongoose.model('Video', videoSchema)