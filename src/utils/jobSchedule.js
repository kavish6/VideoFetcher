const {  SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const {getVideos}=require('./videoSearch');
const {getLastTime}=require('../database/databaseHelper');
const makeJob=(query)=>{
    const task = new AsyncTask(
        'videoFetch', 
        async () => { 
            let time=await getLastTime(query);
        if(time===null)
        {
            let curTime=new Date('2023-01-01T00:00:00Z');
            await getVideos(query,curTime);
        }
        else
        {
            let curTime=new Date(time);
            curTime.setSeconds(curTime.getSeconds()+30);
            await getVideos(query,curTime);
        }
    },
    (err) => {  
        console.log(err);
    }
    );
    const job = new SimpleIntervalJob({ seconds: 30,runImmediately:true }, task)
    return job;
}
module.exports={makeJob};