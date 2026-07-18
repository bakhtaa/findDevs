const express= require('express');
const connect= require('./config/database');

const app = express();

const User= require('./models/user');
const {validateSignUpData}= require('./utils/validation')
const bcrypt= require("bcrypt");
const cookieParser= require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}= require("./middlewares/auth");
const authRouter= require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter= require('./routes/user');
app.use(express.json());
app.use(cookieParser());
/*app.use(userAuth());*/

//now our middleware express.json() will be activated for all the routes
//app.use(callback function)
//this  app.use() will run on every request that comes to our server
//if i give it some route : app.use(/route1,callback function)
//then this will only work for route1 and not all routes but for all type of requests


//this will save the data to the database 
//the save function will return a promise this is why you should use async await 

app.use('/',authRouter);
app.use('/',requestRouter);
app.use('/',profileRouter);
app.use('/',userRouter);

app.get("/feed", async (req, res)=>{
    try{
     const users = await User.find({});
     res.send(users);
    }
   catch(err){
    res.status(400).send('mechekel f thniya');
   }
})




app.delete("/user/:id", async (req,res)=>{
     //const userId= req.body.userId;
        const userId = req.params.id;
    try{
       const user = await User.findByIdAndDelete(userId);
       res.send("yeey");
        
    }
    catch(err){
     res.status(400).send("errora");
    }
})




connect().then( ()=>{
    
    console.log("connected babby");
//once your database is successfullly connected then you should do your app.listen(), 
//ceci assure que le client mayadhrabch aa serveur wel basa mezelt mehich connecté
app.listen(3000, ()=>{
    console.log("server running");
});
}).catch(err=>{
      console.error(err);
});

