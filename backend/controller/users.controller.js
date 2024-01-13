const { ObjectId } = require("mongodb")
const { userCollection } = require("../model/mongoDB")

const  vCardsJS = require('vcards-js');
const vCard = vCardsJS();

// add new user and store DB
const addUser = async (req,res) =>{
    
    try{
        const {userPath,name,position,organization,email,img,tel,work_tel,LinkedIn_url,status} = (req.body)
      
      
      const newUser = {userPath:userPath.toLowerCase(),name,position,organization,email,img,tel,work_tel,LinkedIn_url,status,date: new Date()}
     
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
    const urlPath = path.toLowerCase()
   
    const query = { userPath: { $regex: urlPath, $options: "i" } };
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
    try {
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

const getVcard = async (req,res) =>{
    try {
        const {id} =req.query;
    const query = {_id: new ObjectId(id)}
    const user = await userCollection.findOne(query)
    const {name,position,organization,email,img,tel,work_tel,LinkedIn_url} = user
    vCard.isOrganization = true;
    vCard.firstName = name;
    vCard.homePhone = tel;
    vCard.workPhone = work_tel;
    vCard.email = email;
    vCard.organization = organization;
    vCard.title = position;
    vCard.photo.embedFromFile(img)
    vCard.socialUrls['linkedIn'] = LinkedIn_url;
    vCard.url = LinkedIn_url;


    // Set response headers for downloading the file
  res.setHeader('Content-Type', 'text/vcard');
  res.setHeader('Content-Disposition', `attachment; filename=${name}_contact.vcf`);
          // Send the vCard as a response
        res.send(vCard.getFormattedString());
    } catch (error) {
        
    }
}



module.exports = {
    addUser,singelUser,update_user,deleteUser,AllUsers,getVcard
}