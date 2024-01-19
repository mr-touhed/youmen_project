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

// const getVcard = async (req,res) =>{
//     try {
//         const {id} =req.query;
//         const query = {_id:new ObjectId(id)}
//     const user = await userCollection.findOne(query)
//     console.log(user)
//     const {user_name,position,office,email,img,tel,work_tel,social_links} = user
//     const imgExtention = img.split(".")[img.split(".").length-1]
//     const convertImg = await getImageBase64(img)
//     const fbLink = social_links.find(link => link.web_name === "facebook");
//     const linkedIn = social_links.find(link => link.web_name === "linkedIn");
//     const other_link = social_links.find(link => link.web_name === "others");

//     vCard.logo.embedFromString(convertImg, `image/${imgExtention}`)
//     vCard.version = '3.0';
//     vCard.isOrganization = true;
//     vCard.firstName = user_name;
//     vCard.homePhone = tel;
//     if(work_tel){
//         vCard.workPhone = work_tel;
//     }
//     vCard.email = email;
//     vCard.organization = office;
//     vCard.title = position;
//     vCard.photo.attachFromUrl(img, imgExtention);
//     if(fbLink){
//         vCard.socialUrls['facebook'] = fbLink.link;
//         vCard.url=fbLink.link
//     }
//     if(linkedIn){
//         vCard.socialUrls['linkedIn'] = linkedIn.link;
//         vCard.url=linkedIn.link
//     }
//     if(other_link){
//         vCard.socialUrls['custom'] = other_link.link;
//         vCard.url=other_link.link
//     }
    

// //   //set content-type and disposition including desired filename
//   res.set('Content-Type', `text/vcard; name="${user_name}.vcf"`);
//   res.set('Content-Disposition', `inline; filename="${user_name}.vcf"`);
// //           // Send the vCard as a response
//         res.send({vcard:vCard.getFormattedString()});
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({result:false,massage:"some thing went wrong", error})
//     }
// }

const sendMail = async (req,res) =>{
    console.log(req.body)
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


module.exports = {
    addUser,singelUser,update_user,deleteUser,AllUsers,sendMail
}