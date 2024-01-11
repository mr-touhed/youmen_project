const path = require("path")
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const { adminCollection } = require("../model/mongoDB");
const { ObjectId } = require("mongodb");
const saltRounds = 10;



// api  for create  new admin 
const AdminPage = (req,res) =>{

    const FilePath = path.join(__dirname,"..","views","index.html")
    res.sendFile(FilePath)
}

// api for get new admin user data and store 
const createAdmin = async (req,res) =>{
        const {name,email,password} = req.body
        
        
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            const  newAdmin = {...req.body,password:hash}
                const result = await adminCollection.insertOne(newAdmin)
                console.log(result)
            res.send("<h1 style='text-align:center'>Add new Admin successfully</h1>")
           
        });

}

const adminLogin = async (req,res) =>{
    
    const {email,password} = req.body
    const query = {email:email}
   try{
    const admin =await adminCollection.findOne(query)
    
    if(admin === null){
        
        return res.status(404).json({result:false,massage:"email not match"})
    }
    if(admin.email === email){
        
        bcrypt.compare(password, admin.password, function(err, result) {
           
            if(err || !result){
                
                return res.status(404).json({result:false,massage:"password not match"})
            }
            if(result){
                const token  = jwt.sign({
                    data: admin._id
                  }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' })
                return res.status(200).json({result:true,massage:"your log in success", token})
                
            }
        });
    }

   }catch(err){

    console.log(err)
   }
    
}

const checkAdmin =async (req,res) =>{
    console.log(req.headers.id)
    const id = req.headers.id
    const query = {_id: new ObjectId(id)}
    const result = await adminCollection.findOne(query)
    
    if(result !== null){
        return res.status(200).json({result:true,isAdmin:true})
        
    }
    return res.status(403).json({result:false,massage:"unauthorized user",isAdmin:true})
    
}



module.exports = {
    createAdmin,
    AdminPage,
    adminLogin,
    checkAdmin
}