import { MongoClient } from "mongodb";
const url="mongodb+srv://sangwans904:07nk94rplj@cluster0.kssrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(url, {
    tls: true,
  });
const connect=async()=>{
    try{
        await client.connect();
        console.log("Connected to database");
    }catch(err){
        console.error("Error in connecting to database:", err.message);
    }
}
export {client};
export default connect;
