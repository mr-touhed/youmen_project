const { ObjectId } = require("mongodb")
const { userCollection } = require("../model/mongoDB")

const  vCardsJS = require('vcards-js');
const {  getImageBase64 } = require("../utils/base64Convert");
const vCard = vCardsJS();

// add new user and store DB
const addUser = async (req,res) =>{
    
    try{
            
        
        const path = req.body.user_path
     
      const existUser =await  userCollection.findOne({userPath:path})
        
      if(existUser){
       
       return res.status(404).json({result:false,massage:"user name alrady exist"})
      }
      
      const result = await  userCollection.insertOne(req.body)
      
      res.status(200).json({result:true,massage:"add successfuly", result})
      }catch(err){
        console.log(err)
      }
}


const singelUser = async(req,res) =>{
   try {
    const {path} = req.query;
    const urlPath = path.toLowerCase()
   
    const query = { user_path: { $regex: urlPath, $options: "i" } };
    const user = await userCollection.findOne(query)
    console.log(user)
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
        const {id,user_path,name,position,office,email,tel,work_tel,status,socialLinks}=(req.body)
    const filter = {_id: new ObjectId(id)}
    const updateDocument = {
        $set: {
            user_path,
            user_name:name,position,office,email,tel,work_tel,social_links:socialLinks,status
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
        const query = {_id:new ObjectId(id)}
    const user = await userCollection.findOne(query)
    const {name,position,organization,email,img,tel,work_tel,LinkedIn_url} = user
    const imgExtention = img.split(".")[img.split(".").length-1]
    const convertImg = await getImageBase64(img)
   
    vCard.logo.embedFromString(convertImg, `image/${imgExtention}`)
    vCard.isOrganization = true;
    vCard.firstName = name;
    vCard.homePhone = tel;
    vCard.workPhone = work_tel;
    vCard.email = email;
    vCard.organization = organization;
    vCard.title = position;
    vCard.photo.attachFromUrl(img, imgExtention);
    vCard.socialUrls['linkedIn'] = LinkedIn_url;
    vCard.url = LinkedIn_url;


  //set content-type and disposition including desired filename
  res.set('Content-Type', `text/vcard; name="${name}.vcf"`);
  res.set('Content-Disposition', `inline; filename="${name}.vcf"`);
          // Send the vCard as a response
        res.send({vcard:vCard.getFormattedString()});
    } catch (error) {
        console.log(error)
        res.status(404).json({result:false,massage:"some thing went wrong", error})
    }
}



module.exports = {
    addUser,singelUser,update_user,deleteUser,AllUsers,getVcard
}