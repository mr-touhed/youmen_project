const { userCollection } = require("../model/mongoDB")




// add new user and store DB
const addUser = (req,res) =>{
    res.send("add user")
}


const singelUser = (req,res) =>{
    res.send("singel user")
}


// get all users 
const AllUsers = async(req,res) =>{
    
        const result =await userCollection.find().toArray()
        res.send(result)

}

const update_user =(req,res) =>{
    res.send("update user")
}

const update_status = (req,res) =>{
    res.send("update status")
}

module.exports = {
    addUser,singelUser,update_user,update_status,AllUsers
}