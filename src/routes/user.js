//
//GET /user/connections
//GET /user/requests
//GET /user/feed get the profiles of the other users on the plateform 



//first route is GET /user/connections


const {userAuth}= require("../middlewares/auth");
const express = require('express');

const userRouter= express.Router();
const ConnectionRequest= require('../models/connectionRequest');



userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
 //le logged in user veut voir la liste des coonnections qu'il a 
    //donc on doit extraire de la base de données tout les documents ConnectionRequest 
    //dont le status est accepted 
    //ceci est donc un tableau de connections qu'on doit renvoyer
    const loggedUser= req.user; 
    const connections= await  ConnectionRequest.find({
        
        toUserid: loggedUser._id,
        status: "accepted"}); 
    //ceci veut dire renvoie moi toutes les connections dont le status est accepted
    //maintenant que nous avons un tableau connections 
    //il reste juste de le renvoyer avec la response
    res.json({connections});
    //voila le travail fait sans verification
    }
    catch(err){
        res.send("an error occured somewhere "+ err);
    }
   
})

userRouter.get("/user/requests", userAuth, async (req,res)=>{

    try {
//le logged in user veut voir la liste des coonnections qu'il a 
    //donc on doit extraire de la base de données tout les documents ConnectionRequest 
    //dont le status est accepted 
    //ceci est donc un tableau de connections qu'on doit renvoyer
    const requests= await ConnectionRequest.find({ 
        toUserid: loggedUser._id, 
        status: "interested"}); 

    //ceci veut dire renvoie moi toutes les connections dont le status est accepted
    //maintenant que nous avons un tableau connections 
    //il reste juste de le renvoyer avec la response
    res.json({requests});
    //voila le travail fait sans verification
    }
    catch(err){
        res.send("an error occured somewhere "+ err);
    }
    
})




