import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import {json} from 'body-parser';
import {router} from './routes/generalRoutes';
import {startFetch,stopFetch} from './utils/jobSchedule';
import mongoose from 'mongoose';
const app = express();
app.use(cors());
app.use(json());
try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
} catch (error) {
    console.log(error);
}
startFetch('cricket');
try {
    app.listen(process.env.PORT, () =>{
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT)
    }    
    );
} catch (error) {
    console.log(error);
    stopFetch();
}
app.use(router);
