const express= require('express');
const connect= require('./config/database');

const app = express();

const User= require('./models/user');
const {validateSignUpData}= require('./utils/validation')
const bcrypt= require("bcrypt");
const cookieParser= require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}= require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());
/*app.use(userAuth());*/

//now our middleware express.json() will be activated for all the routes
//app.use(callback function)
//this  app.use() will run on every request that comes to our server
//if i give it some route : app.use(/route1,callback function)
//then this will only work for route1 and not all routes but for all type of requests

app.post("/signup", async(req, res )=>{
    try{
// bech nekhdhou ldata stocké fel req w nhotouha fel basa
//nasn3ou instance mta3 lmodel user nostockiw feha data li jetna mel req
validateSignUpData(req);
const {firstName,lastName,emailId,password}= req.body;
    console.log("Signup route hit");
console.log(req.body);

//data in sent to the poster in the body of a post request but our express server is unable to read
//json data, to be able to read json data we have to use a middleware , this is why when we write 
//console.log(req.body) we get undefined
//we need a middleware because it's a function that's gonna be used for all the apis 
//it is used to convert the json object into a javascript object so we can use that data into the code


//encrypt the password 
const passwordHash= await bcrypt.hash(password,10);
console.log(passwordHash);


const user= new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash
});

await user.save();
res.send("user signed in yee yee");
}
catch(err){
    res.status(400).send("error occured "+ err.message);
}
})
//this will save the data to the database 
//the save function will return a promise this is why you should use async await 

app.post("/login", async (req,res)=>{
    try{
       const  {emailId,password} = req.body; 
       
       //select document user where email mtena is equal to emailid w hotou fel variable user
       const user= await User.findOne({ emailId: emailId});
       //if email is not valid then user will be undefined and we should throw an error
       if(!user){
        throw new Error("email not valid");
       }
       //hata error masaret yani email valid yani ahna we are here fel code
       //tawa najmou ntestiw lmdpasse
       //le role de bcrypt.compare est de prendre en parametre le mdp entré par l'utilisateur et 
       //stocké in the request , et de prendre en parametre le mot de passe haché de la database et 
       // de tout faire pour que ça marche  
       const ispasswordvalid= await user.validatepassword(password);

       if(ispasswordvalid){
        //create a jwt 
       const token = await user.getJWT();
        console.log(token);
        //wrap the json token in a cookie 
        //send the cookie with the response 
        res.cookie("token", token);
        res.send("user login successfully");
       }
       else{
        throw new Error("password is not valid");
       }

    }
    catch(err){
     res.status(400).send("error occured "+ err.message);
    }
})
app.get("/profile", userAuth,async (req, res)=>{
const user= req.user;
 res.send(user);
})
app.get("/feed", async (req, res)=>{
    try{
     const users = await User.find({});
     res.send(users);
    }
   catch(err){
    res.status(400).send('mechekel f thniya');
   }
})

app.post("sendConnectionRequest", (req,res)=>{
    console.log("sending connection request");
    res.send("connexion request sent");

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

