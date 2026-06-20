
const mongoose= require('mongoose');

const connect = async ()=>{
    
 await mongoose.connect("mongodb+srv://bakhtanairouzbhs_db_user:6tSIoj2aijyHobwN@namastenode.ebibhec.mongodb.net/devTinder");
    }
   
 
module.exports=connect;


