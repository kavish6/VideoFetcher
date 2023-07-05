const {  SimpleIntervalJob, AsyncTask,ToadScheduler } = require('toad-scheduler');
const {fetchVideos}=require('./videoSearch');
const {getLastTime}=require('../database/databaseHelper');
const scheduler = new ToadScheduler();

const startFetch=(query)=>{
    const task = new AsyncTask(
        'videoFetch', 
        async () => { 
            let time=await getLastTime(query);
        if(time===null)
        {
            let curTime=new Date('2023-01-01T00:00:00Z');
            await fetchVideos(query,curTime);
        }
        else
        {
            let curTime=new Date(time);
            curTime.setSeconds(curTime.getSeconds()+30);
            await fetchVideos(query,curTime);
        }
    },
    (err) => {  
        console.log(err);
    }
    );
    const job = new SimpleIntervalJob({ seconds: 30,runImmediately:true }, task,{'id':'fetch'});
    scheduler.addSimpleIntervalJob(job);
}
const stopFetch=()=>{
    try {
        if(scheduler.existsById('fetch'))
        {
            scheduler.stopById('fetch');
            scheduler.removeById('fetch');
        }
    } catch (error) {
     console.log(error);   
    }
}
export {startFetch,stopFetch};
