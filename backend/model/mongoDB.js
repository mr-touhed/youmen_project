const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = process.env.DB_URL
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect();
 client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

const adminCollection  = client.db("intro-data").collection("admin");
const userCollection = client.db("intro-data").collection("users");

module.exports ={
    adminCollection,
    userCollection

}