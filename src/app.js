const express = require('express');
require('dotenv').config();;
const routes=require('./routes/generalRoutes');
const {startFetch,stopFetch}=require('./utils/jobSchedule');
const mongoose=require('mongoose');
const app = express();
app.use(routes);
app.use(express.json());
try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true});
} catch (error) {
    console.log(error);
}
startFetch('cricket');
app.listen(process.env.PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT)
    else 
    {
        console.log("Error occurred, server can't start", error);
        stopFetch();
    }
    }
);
