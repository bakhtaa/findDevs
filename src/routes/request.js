


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
//making the api validation 
//on peut le faire ici qaudn la requete nous arrive mais le plus logique est de faire the api 
//validation avant que la requete arrive : c'est à dire on construit une validation middleware avant

const tab= ["interested", "ignored"]; 
if (!tab.includes(status)){
    return res.status(400).send("bad request");
}
//on va maintenant vérifier à travers le code que si the connection request is sent it should not
//be sent again so we do retuen , et aussi que le user qui a reçu la connection request ne doit pas 
//l'envoyer au user qui l'a deja envoyé auparavant pour empecher the duplication
const existingConnectionRequest= await ConnectionRequest.findOne({

    $or: [
   { fromUserid,
    toUserid},
    {fromUserid: toUserid, toUserid: fromUserid}
    ]
   
    
})

if(existingConnectionRequest){
    return res.status(400).send("connection already created");
}
//on doit aussi verifier si le user auquel we are sending the connection requestion does exist in our db 
//for that on doit verifier si cet id existe dans la collection users 
// l'id qu'on doit verifier est deja stocké dans toUserid 
const existingUser= await User.findOne({
    _id: toUserid
})

if(!existingUser){
    return res.status(400).send("this user doesn't exist");
}

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

}


    // res.send(user.firstName + " sent you a connection request");
   
   catch(err){
    res.status(400).send("an error has occured "+ err);
   }
   

})




module.exports= requestRouter;
