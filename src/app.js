const express = require('express');
require('dotenv').config();
const app = express();
app.listen(process.env.PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
