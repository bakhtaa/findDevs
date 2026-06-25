const express= require('express');
const connect= require('./config/database');

const app = express();

const User= require('./models/user');

app.post("/signup", (req, res )=>{
// bech nekhdhou ldata stocké fel req w nhotouha fel basa
//nasn3ou instance mta3 lmodel user nostockiw feha data li jetna mel req

const user= new User({});
})




connect().then(()=>{console.log("connected babby");
//once your database is successfullly connected then you should do your app.listen(), 
//ceci assure que le client mayadhrabch aa serveur wel basa mezelt mehich connecté
app.listen(3000, ()=>{
    console.log("server running");
});
}).catch(err=>{
    console.error("etissal maktou3");
});

