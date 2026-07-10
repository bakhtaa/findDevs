const { MongoNetworkError } = require("mongodb");
const mongoose = require("mongoose");

const connectionRequestSchema= new mongoose.Schema(
    {
        fromUserid:{
            type: mongoose.Schema.Types.ObjectId,
            required:true
           
        }, 

        toUserid: {
             type: mongoose.Schema.Types.ObjectId,
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

    const ConnectionRequestModel=  mongoose.model("ConnectionRequest", connectionRequestSchema);


    module.exports= ConnectionRequestModel;
    