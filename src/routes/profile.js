const {userAuth}= require("../middlewares/auth");
const User= require('../models/user');
const {validateEditProfileData}= require('../utils/validation');

const express = require('express');
const profileRouter= express.Router();

profileRouter.get("/profile/view", userAuth,async (req, res)=>{
    try{
const user= req.user;
 res.send(user);
}

catch(err){
res.status(400).send("an error has occured : "+ err);
}
})

profileRouter.patch("/profile/edit", userAuth,async (req, res)=>{
    try{
  if (!validateEditProfileData(req)) {
    throw new Error("Invalid Edit Request");}
//prendre de la base deonnees le user dont l'id est dans la req avec find
//resend the data modified to the database of that user
 const loggedInUser = req.user;
 Object.keys(req.body).forEach((key) => { 
    (loggedInUser[key] = req.body[key]); 
});
    console.log(loggedInUser);
}

catch(err){
res.status(400).send("an error has occured : "+ err);
}
})

module.exports= profileRouter;