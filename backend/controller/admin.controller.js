const path = require("path")
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const { adminCollection } = require("../model/mongoDB");
const saltRounds = 10;



// api  for create  new admin 
const AdminPage = (req,res) =>{

    const FilePath = path.join(__dirname,"..","views","index.html")
    res.sendFile(FilePath)
}

// api for get new admin user data and store 
const createAdmin = (req,res) =>{
        const {name,email,password} = req.body
        
        
        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            const  newAdmin = {...req.body,password:hash}

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





module.exports = {
    createAdmin,
    AdminPage,
    adminLogin
}