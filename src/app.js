const express= require('express');
const connect= require('./config/database');

const app = express();

connect().then(()=>{console.log("connected babby");
app.listen(3000, ()=>{
    console.log("server running");
});
}).catch(err=>{
    console.error("etissal maktouu3");
});

