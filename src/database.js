
const {MongoClient}=require("mongodb");
const url= 'mongodb+srv://bakhtanairouzbhs_db_user:6tSIoj2aijyHobwN@namastenode.ebibhec.mongodb.net/';
const client= new MongoClient(url);

const dbName="HelloWorld";


async function main(){
    await client.connect();
    console.log("client connected to server");
    const db=client.db(dbName);
    const collection = db.collection("User");
    return "done";
}


main().then(console.log).catch(console.error).finally(()=>client.close());