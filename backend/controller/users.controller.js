const { ObjectId } = require("mongodb")
const { userCollection } = require("../model/mongoDB")

const  vCardsJS = require('vcards-js');
const {  getImageBase64 } = require("../utils/base64Convert");
const sendingEmail = require("../utils/sendMail");
const vCard = vCardsJS();

// add new user and store DB
const addUser = async (req,res) =>{
    
    try{
            
       
        const path = req.body.user_path
     
      const existUser =await  userCollection.findOne({user_path:path})
        
      if(existUser){
       
       return res.status(404).json({result:false,massage:"user url Path alrady exist"})
      }
      
      const result = await  userCollection.insertOne(req.body)
      
      res.status(200).json({result:true,massage:"add successfuly", result})
      }catch(err){
        console.log(err)
      }
}


const singelUser = async(req,res) =>{
   try {
        
    const {id} = req.query
    const query = {_id:new ObjectId(id)};
    
    const user = await userCollection.findOne(query)
    
    if(user === null){
       return res.status(404).json({result:false,massage:"user not found"})
        
    }else{
        
       res.status(200).json({result:true,massage:"user found", user})
    }
   } catch (error) {
        return res.status(404).json({result:false,massage:"user not found"})
   }
}


// get all users 
const AllUsers = async(req,res) =>{
    
        const result =await userCollection.find().toArray()
        res.send(result)

}

const update_user =async (req,res) =>{
    try {
        const {id,user_path,name,position,office,email,tel,work_tel,status,socialLinks,address}=(req.body)
    const filter = {_id: new ObjectId(id)}
    const updateDocument = {
        $set: {
            user_path,
            user_name:name,position,office,email,tel,work_tel,social_links:socialLinks,status,address
        },
     };

     const result = await userCollection.updateOne(filter, updateDocument);
     
     if(result.modifiedCount > 0){
        
       return res.status(200).json({result:true,massage:"update user successfully"})
        
     }
    } catch (error) {
        res.status(404).json({result:false,massage:"not  modified any data"})
    }

     

}

const deleteUser = async (req,res) =>{
    try {
        
        const {id} = req.query;
        const query = {_id:new ObjectId(id)}
        const result = await userCollection.deleteOne(query)
        return res.status(200).json({result:true,massage:"user delete successfully"})
    } catch (error) {
        res.status(404).json({result:false,massage:"some thing went wrong", error})
    }
    
}


const sendMail = async (req,res) =>{
   
    const {
        name,
        email,
        phone,
        sendTo,
        partner
      } = req.body
    try {
       
          const response = await sendingEmail(email,sendTo,name,phone,partner)
          console.log(res, "response............")
          if(response){
            return res.status(200).json({result:true,massage:"send massage successfully"})
          }
    } catch (error) {
        console.log(error, "block error,,,,,,,,,,,")
        res.status(404).json({result:false,massage:"some thing went wrong", error})
    }

}

const userInfo = async(req,res) =>{
    
    try {
        const {path} = (req.query)
    const userPath = path.trim()
   
    const user = await userCollection.findOne({user_path: { "$regex" : userPath , "$options" : "i"}})
    if(user === null){
        return res.status(404).json({result:false,massage:"user not found"})
         
     }else{
         
        res.status(200).json({result:true,massage:"user found", user})
     }
    } catch (error) {
         return res.status(404).json({result:false,massage:"user not found"})
    }

    
}

module.exports = {
    addUser,singelUser,update_user,deleteUser,AllUsers,sendMail,userInfo
}