const axios = require('axios');
const {addVideo}=require('../database/databaseHelper');
const getVideos=async(query,currentPublishedDate)=>{
    console.log('querying for videos');
    axios.get('https://www.googleapis.com/youtube/v3/search',{
        params:{
            key:process.env.YOUTUBE_API_KEY,
            part:"snippet",
            type:"video",
            order:"date",
            maxResults:20,
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
        console.log(error);
    });
}
module.exports={getVideos};