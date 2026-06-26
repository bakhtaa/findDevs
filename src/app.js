const express= require('express');
const connect= require('./config/database');

const app = express();

const User= require('./models/user');

app.use(express.json());
//now our middleware express.json() will be activated for all the routes
//app.use(callback function)
//this  app.use() will run on every request that comes to our server
//if i give it some route : app.use(/route1,callback function)
//then this will only work for route1 and not all routes but for all type of requests

app.post("/signup", async(req, res )=>{
// bech nekhdhou ldata stocké fel req w nhotouha fel basa
//nasn3ou instance mta3 lmodel user nostockiw feha data li jetna mel req
    console.log("Signup route hit");
console.log(req.body);
//data in sent to the poster in the body of a post request but our express server is unable to read
//json data, to be able to read json data we have to use a middleware , this is why when we write 
//console.log(req.body) we get undefined
//we need a middleware because it's a function that's gonna be used for all the apis 
//it is used to convert the json object into a javascript object so we can use that data into the code

const user= new User(req.body);
try{
await user.save();
res.send("user signed in yee yee");
}
catch(err){
    res.status(400).send("error occured"+ err.message);
}
})
//this will save the data to the database 
//the save function will return a promise this is why you should use async await 

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

