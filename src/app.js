const express= require('express');

const app = express();

//this will match the get api call
app.get("/users", [(req,res,next)=>{
    console.log("paw paw");
       next();
    //res.send({name: 'bakhtaa'});
 

}, (req,res,next)=>{
    //route handler 2
    console.log("yok yok");
    next();
   // res.send("second response");
},
 (req,res,next)=>{
    //route handler 2
    console.log("diko yok");
    next();
},
 (req,res)=>{
    //route handler 2
    console.log("diko diko");
    res.send("last response!!!");
}]);
app.post("/users", (req,res)=>{
    res.send("added to dbb")
});

app.delete("/users", (req,res)=>{
    res.send("deleted")
});

//this will match all the api calls 
app.use("/",(req,res)=>{
    res.send("wiwaa wiwaa");
})


app.listen(3000, ()=>{
    console.log("server running");
});