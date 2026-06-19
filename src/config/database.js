
const mongoose= require('mongoose');

const connect = async ()=>{
 await mongoose.connect("mongodb+srv://bakhtanairouzbhs_db_user:6tSIoj2aijyHobwN@namastenode.ebibhec.mongodb.net/");
}
 



connect().then(console.log("connected babby")).catch(err=>{
    console.error("etissal maktouu3");
});