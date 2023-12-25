const { ObjectId } = require("mongodb")
const { userCollection } = require("../model/mongoDB")




// add new user and store DB
const addUser = async (req,res) =>{
    
    try{
        const {userPath,name,position,organization,email,img,tel,work_tel,LinkedIn_url,status} = (req.body)
      
      
      const newUser = {userPath,name,position,organization,email,img,tel,work_tel,LinkedIn_url,status,date: new Date()}
     
      const existUser =await  userCollection.findOne({userPath:userPath})
     
      if(existUser){
       return res.status(404).json({result:false,massage:"user name alrady exist"})
      }
      
      const result = await  userCollection.insertOne(newUser)
      
      res.status(200).json({result:true,massage:"add successfuly", result})
      }catch(err){
        console.log(err)
      }
}


const singelUser = async(req,res) =>{
    const {path} = req.query;
  
    const query = {userPath:path}
    const user = await userCollection.findOne(query)
   
    if(user === null){
       return res.status(404).json({result:false,massage:"user not found"})
        
    }else{
        
       res.status(200).json({result:true,massage:"user found", user})
    }
}


// get all users 
const AllUsers = async(req,res) =>{
    
        const result =await userCollection.find().toArray()
        res.send(result)

}

const update_user =async (req,res) =>{
    const {userPath,name,position,organization,email,tel,work_tel,LinkedIn_url,status,_id}=(req.body)
    const filter = {_id: new ObjectId(_id)}
    const updateDocument = {
        $set: {
            userPath,
            name,position,organization,email,tel,work_tel,LinkedIn_url,status
        },
     };

     const result = await userCollection.updateOne(filter, updateDocument);
     
     if(result.modifiedCount > 0){
        
       return res.status(200).json({result:true,massage:"update user successfully"})
        
     }

     res.status(404).json({result:false,massage:"not  modified any data"})

}

const update_status = (req,res) =>{
    res.send("update status")
}

module.exports = {
    addUser,singelUser,update_user,update_status,AllUsers
}