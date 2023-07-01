const mongoose = require('mongoose');
const Video=require('../models/videosModel');

const getLastTime=async(query)=>{
    try {
        let lastTime= await Video.find({query:query}).select('publishedAt').sort({publishedAt:-1}).limit(1).exec();
        return lastTime[0].publishedAt;
    } catch (error) {
        return null;
    }
}
const addVideo= async(video)=>{
    const data= new Video(video);
    await data.save();
}
module.exports={getLastTime,addVideo};