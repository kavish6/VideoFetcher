const {getVideos,getCount}=require('../database/databaseHelper');
const schedule=require('../utils/jobSchedule');
const getAllVideos=async(req,res)=>{
const {page=1,limit=10}=req.query;
try {
    let videos=await getVideos(page,limit);
    let count=await getCount();
    res.json({
        videos,
        totalPages:Math.ceil(count/limit),
        currentPage:page,
    });
} 
catch (error) {
 console.log(error);   
}
}
const stopFetch=(req,res)=>{
schedule.stopFetch();
res.json({message:"Fetching stopped"});
}
module.exports={getAllVideos,stopFetch};