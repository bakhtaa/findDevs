const jwt =require('jsonwebtoken');

const User= require("../models/user");

const userAuth= async (req,res,next)=>{
    try{
console.log("making auth middleware");
const {token}=req.cookies; 

if (!token){
    throw new Error("token mafkoud ");
}
//awel haja bech nkharjou lcookies men request.body 
//baed on va verifier est ce que token li mawjoud fel cookies hwa nafsou li hachtna bih
//toute operation qui prend du temps est précédé par un await 
//c à dire que cette operation retourne le resultat d'une promesse and we have to wait for it
const decoded = await jwt.verify(token, "DEV@TINDER9$");
//jwt.verify retourne un objet qui contient l'id du user qui vient de se connecter
const {_id}=decoded;
//maintenant que nous avons l'id du user qui s'est connecté on veut extraire ce user
const user= await  User.findById(_id); 
//tawa ken luser mafamech maneha user will return false
//yani nekloubouha bech najmou nodkhlou fel condition bech ki luser false chnwa namlou
if (!user){
    throw new Error("user not found");
}
req.user = user;
//if everything works we move to the next middleware
next();

    }
    catch(err){
        res.status(400).send(" an error has occured : ahaya: "+ err.message);
    }
};



module.exports={userAuth};