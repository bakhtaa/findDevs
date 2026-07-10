

const User= require('../models/user');


const express= require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter= express.Router();




requestRouter.post("/request/send/interested/:toUserid",userAuth, (req,res)=>{
   try{
//apres qu'en passe sur le middleware userAuth, on stocke dans la request le user qui vient
//de faire le login donc on aura  
const fromUser= req.user._id;
//pour avoir notre toUserid il faut l'extraire des params : /request/send/interested/:toUserid"
//ceci se stocke dans la req.params : il suffit de l'extraire 
const toUser= req.params.toUserid;

//nous avons maintenant assez d'info pour pouvoir remplir note ConnectionRequestModel : 
//touserid et fromuserid

//il reste seulement status


     res.send(user.firstName + " sent you a connection request");
   }
   catch(err){
    res.status(400).send("an aerroe has occured "+ err);
   }
   

})




module.exports= requestRouter;