const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
var validator= require('validator');
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema=  mongoose.Schema(
    {
        firstName: {
            type : String,
            required: true
            
        }, 
        lastName: {
            type: String
        }, 
        emailId: {

            type: String,
            required: true,
            //in mongodb : if you make a field as unique : mongodb automatically 
            //creates an index for that
//from the doc : you can always define mongodb indexes using schemas type options : unique, index, sparse
            unique: true,
            //index: true
            validate(value){
                if (! validator.isEmail(value)){
                  throw new Error("invalid email address bro");
                };
            }
        }, 
        password: {
            type: String,
            required: true,
            trim: true,
            validate(){
                if (true){
                  //la fonction validate peut être utilisé dans le schema pour valider quelque chose de 
                  //complexe dans notre variable
                }
            }
        }, 
        age: {
            type: Number
        }, 
        gender: {
            type: String, 
            validate(value){
                if (!["male", "female"].includes(value)){
                    throw new Error("ghalet lgender we")
                }
            }
        },
        photoUrl: {
            type: String
        }, 
        about: {
            type : String,
            default: "ti wohh"
        }, 
        Skills: {
            //skills multiple : array of skills
            type: [String]
        }

    }, 
    {
        timestamps: true
    }
)

userSchema.methods.getJWToken= async function(){
    // the this key word does not work inside an arrow function 
    // this is why we use an anonymous function instead
    const user= this;
    
    //this represents the instance of the model User
     const token = await jwt.sign({_id:user.id}, "DEV@TINDER9$", {expiresIn: '1d'});
     return token; 
}
userSchema.methods.validatepassword= async  function(passwordbyuser){
    const user= this;
   const pass= await bcrypt.compare(passwordbyuser, user.password);
    return pass ; 
}

const userModel= mongoose.model("User", userSchema);

module.exports=userModel;