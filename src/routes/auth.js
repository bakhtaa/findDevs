

const User= require('../models/user');
const express = require('express');
const {validateSignUpData}= require('../utils/validation');
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const {userAuth}= require("../middlewares/auth");
const cookieParser= require("cookie-parser");


const authRouter= express.Router();


authRouter.post("/signup", async(req, res )=>{
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



authRouter.post("/login", async (req,res)=>{
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
       const token = await user.getJWToken();
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

authRouter.post("/logout", userAuth, async(req, res)=>{
     res.cookie("token", null, {
        "expires": new Date(Date.now())
     }).send("log out successfully , cookie expired");
     //chaining of cookie and send
})

module.exports= authRouter;
