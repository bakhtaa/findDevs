const {userAuth}= require("../middlewares/auth");
const User= require('../models/user');


const express = require('express');
const profileRouter= express.Router();

profileRouter.get("/profile", userAuth,async (req, res)=>{
    try{
const user= req.user;
 res.send(user);
}

catch(err){
res.status(400).send("an error has occured : "+ err);
}
})



module.exports= profileRouter;