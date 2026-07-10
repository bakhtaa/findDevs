

const User= require('../models/user');

const ConnectionRequest= require('../models/connectionRequest');
const express= require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter= express.Router();




requestRouter.post("/request/send/:status/:toUserid",userAuth, async (req,res)=>{
   try{
//apres qu'en passe sur le middleware userAuth, on stocke dans la request le user qui vient
//de faire le login donc on aura  
const fromUserid= req.user._id;
//pour avoir notre toUserid il faut l'extraire des params : /request/send/interested/:toUserid"
//ceci se stocke dans la req.params : il suffit de l'extraire 
const toUserid= req.params.toUserid;

//nous avons maintenant assez d'info pour pouvoir remplir note ConnectionRequestModel : 
//touserid et fromuserid

//il reste seulement status
//le status est aussi envoyé dans la request : "/request/send/interested/:toUserid"
//ici the status is interested , comment pouvons nous l'extraire?
const status= req.params.status;
const connectionRequest= new ConnectionRequest({
    fromUserid,
    toUserid,
    status
} 
);


//await user.save() retourne le document sauvegardé (l'instance Mongoose),
//  avec toutes les modifications que MongoDB ou Mongoose ont éventuellement apportées.
const data= await connectionRequest.save();


res.json({
    message: "connection request sent successfully", 
    data
})


    // res.send(user.firstName + " sent you a connection request");
   }
   catch(err){
    res.status(400).send("an error has occured "+ err);
   }
   

})




module.exports= requestRouter;
