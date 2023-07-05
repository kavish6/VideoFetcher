import Video from '../models/videosModel';
const getLastTime=async(query)=>{
    try {
        let lastTime= await Video.find({query:query}).select('publishedAt').sort({publishedAt:-1}).limit(1).exec();
        return lastTime[0].publishedAt;
    } catch (error) { 
        return null;
    }
}
const addVideo=async(video)=>{
    const data=new Video(video);
    await data.save();
}
const getAllVideos=async(page,limit)=>{
  
    let data=await Video.find({}).sort({publishedAt:-1}).skip((page-1)*limit).limit(limit).exec();
    return data;
}
const getCount=async()=>{
    let count=await Video.countDocuments();
    return count;
}
const findVideos=async(title,description,page,limit)=>{
    // to implement pagination here also
    let videos=await Video.find({
          title: { $regex: `${title}`, $options: "i" },
          description:{$regex: `${description}`, $options: "i" } 
    }).skip((page-1)*limit).limit(limit).exec();
    let count=await Video.countDocuments({title: { $regex: `${title}`, $options: "i" },
    description:{$regex: `${description}`, $options: "i" }});
    return {videos,count};
}
export {getLastTime,addVideo,getAllVideos,getCount,findVideos};