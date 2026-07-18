const { MongoNetworkError } = require("mongodb");
const mongoose = require("mongoose");

const connectionRequestSchema= new mongoose.Schema(
    {
        fromUserid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //creating a reference to the user collection
            required:true
           
        }, 

        toUserid: {
             type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required:true

        },
        status: {
            type: String,
            //we use enum when we want to restrict somrthing for some values : like a list  of options
            //enum is an object
            enum : {
                values: ["ignored","interested", "accepted", "rejected"], 
                message: `{VALUE} is incorrect status type`

            },
             required:true


        }} , 
        {timestamps: true}

    )


    //creating a compound index
    connectionRequestSchema.index({fromUserid: 1 , toUserid: 1});
    // this query will make fromUseris , and toUserid  findOne() query very fast

    const ConnectionRequestModel=  mongoose.model("ConnectionRequest", connectionRequestSchema);


    module.exports= ConnectionRequestModel;
    