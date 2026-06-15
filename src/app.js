const express= require('express');

const app = express();

//this will match the get api call
app.get("/users", (req,res)=>{
    res.send({name: 'bakhtaa'})
});
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