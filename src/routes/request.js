


const User= require('../models/user');
const ConnectionRequest= require('../models/connectionRequest');
const express= require("express");
const { userAuth } = require("../middlewares/auth");
const { equals } = require('validator');
const requestRouter= express.Router();



//bech tabeth request men luser l user
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

//1 on vient de verifier que status doit être deux valeurs
//2 on vient de verifier que touserid doit exister dans la bdd pour pouvoir y envoyer une req
//3 on vient de verifier qu'une connection request doit exister une seule fois , si la même request
//avec les deux users existe alors elle sera pas envoyer
//4 la dernière chose à vérifier est qu'un user ne doit pas envoyer une requête à lui même
//ceci est très simple parce qu'il suffit de comparer toUserid et fromUserid 
//pour rappel le fromuserid est extrait de la request(le user connecté enregistré dans la req) 
//et le toUiserid est extrait directement de la route donc de req.params

//pour comparer deux objets on utilise equals
if (toUserid.equals(fromUserid)){
    return res.status(400).send("you cant friend yourself here bro");
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


//ki tjik request chnwa tamel : maaneha bech tjik status interested
requestRouter.post("/request/review/:status/:requestId",userAuth, async (req,res)=>{
    //avant de commencer status doit être soit accepted soit rejected
    try{
//we get the loggin user stocké in the request
const loginUser= req.user;
const requestid= req.params.requestId;
const status=req.params.status;
//const  {requestid, status}=req.params;
//request from ashkey to ellon
//we have to make sure that elon is the connected user avant de traiter la request de elon
//ceci est facile il suffit de verifier le firstname du user connecté
//const connectionrequestyasahbi= await ConnectionRequest.findById(requestid);


   const tabstatus=["accepted", "rejected"];

    if (! tabstatus.includes(status)){
      return res.status(400).send("bad request");
    }

const connectionrequestallinone= await ConnectionRequest.findOne({
    _id: requestid,
    //this will make sure that the logged in user is the one who's receiving the request
    toUserid: loginUser._id,
   //the status of the connection request should be interested 
   status: "interested"
})
  //we also have to check if requestId should be valid
  //it means it should be present in our database
if(!connectionrequestallinone ){
    res.status(400).send("la request n'est pas valide");
}
//on va verifier que toUserid et l'id du user connecté sont égaux
//ceci par une requete findOne qui specifie deja le touserid qui doit être identique à notre userid logged in
/*if(! connectionrequestyasahbi.toUserid===user._id){
res.status(400).send("request sent to the wrong user");
}*/ 
        
      
  //if we're here this means li status matnajem tkoun ken accepted or rejected
  //tawa we re gonna treat the two cases : ken accepted chnwa namlou w ken rejected chnwa namlou
  //if we want to accept the request 
  //on change le status to accepted
//actually the accepted or rejected comes with the route 
//our only role is to change to status interested to whatever status comes from the route
connectionrequestallinone.status= status;
//là le status vient d'être changé from interested => accepted or ignored
 
//maintenant on va juste enregistrer les changements vers la base de données

const data = await connectionrequestallinone.save();
//on vient de changer le status vers accepted or ignored 
//maintenant if accepted qu'est ce que ça change and if ignored qu'est ce que ça change
//n'oublie pas de renvoyer une response

res.send({
    message:   "connection request "+ data.status, 
    data  
}); 
     }
     catch(err){
        res.send("an error has occured "+ err);
     }
   
})


module.exports= requestRouter;
