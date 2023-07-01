const express = require('express');
require('dotenv').config();
const {ToadScheduler}=require('toad-scheduler');
const routes=require('./routes/generalRoutes');
const {makeJob}=require('./utils/jobSchedule');
const mongoose=require('mongoose');
const app = express();
const scheduler = new ToadScheduler()
app.use(routes);
app.use(express.json());
try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
} catch (error) {
    console.log(error);
}
const job=makeJob('cricket');
scheduler.addSimpleIntervalJob(job);
app.listen(process.env.PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
