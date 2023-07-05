import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        required: isMyFieldRequired,
        type: String
    },
    description: {
        type: String
    },
    publishedAt:{
        required:true,
        type:Date,
    },
    thumbnail:{
        required:true,
        type:String,
    },
    query:{
        required:isMyFieldRequired,
        type:String,
    },
    url:{
        required:true,
        type:String,
    }
});
function isMyFieldRequired () {
    return typeof this.myField === 'string'? false : true
}

export default mongoose.model('Video', videoSchema)