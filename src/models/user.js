const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
var validator= require('validator');
const userSchema= mongoose.Schema(
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
            unique: true,
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
            default: "bara asba"
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
const userModel= mongoose.model("User", userSchema);

module.exports=userModel;