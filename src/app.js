const express= require('express');
require("./config/database.js");
const app = express();



app.listen(3000, ()=>{
    console.log("server running");
});