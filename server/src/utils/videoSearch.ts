const axios = require('axios');
const {addVideo}=require('../database/databaseHelper');
var keyReqCount=0,queueIndex=0;
var keyQueue=[process.env.YOUTUBE_API_KEY1,process.env.YOUTUBE_API_KEY2,process.env.YOUTUBE_API_KEY3];
const fetchVideos=async(query,currentPublishedDate)=>{
    if(keyReqCount===10000)
    {
        keyReqCount=0;
        queueIndex=(queueIndex+1)%3;
    }
    keyReqCount++;
    console.log('querying for videos');
    axios.get('https://www.googleapis.com/youtube/v3/search',{
        params:{
            key:keyQueue[queueIndex],
            part:"snippet",
            type:"video",
            order:"date",
            maxResults:30,
            publishedAfter:currentPublishedDate.toISOString(),
            q:query
        }
    })
    .then(response => {
        response.data.items.forEach(element => {
            addVideo({
                query:query,
                title:element.snippet.title,
                description:element.snippet.description,
                publishedAt:element.snippet.publishedAt,
                thumbnail:element.snippet.thumbnails.default.url,
                url:`https://www.youtube.com/watch?v=${element.id.videoId}`,
            });
        });
    })
    .catch(error => {
        // console.log(error);
        queueIndex=(queueIndex+1)%3;
        fetchVideos(query,currentPublishedDate);
    });
}
module.exports={fetchVideos};