import {getAllVideos,getCount,findVideos} from '../database/databaseHelper';
const schedule=require('../utils/jobSchedule');
let query='cricket';
const getVideos=async(req,res)=>{
const {page=1,limit=10}=req.query;
try {
    let videos=await getAllVideos(page,limit);
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
const searchVideos=async(req,res)=>{
    const {title='',description='',page=1,limit=10}=req.query;
    let {videos,count}=await findVideos(title,description,page,limit);
    res.json({videos,totalPages:Math.ceil(count/limit),
    currentPage:page,});
}
const getQuery=(req,res)=>{
    res.json({"query":query});
}
const setQuery=(req,res)=>{
    query=req.body.query;
    schedule.stopFetch();
    schedule.startFetch(query);
    res.json({message:`fetching for ${query} now`});
}
const startFetch=(req,res)=>{
    schedule.startFetch(query);
    res.json({message:`fetching for ${query}`});
}
export default {getVideos,stopFetch,searchVideos,getQuery,setQuery,startFetch};