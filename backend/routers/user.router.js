const express = require("express")
const { addUser, update_user, update_status, singelUser, AllUsers } = require("../controller/users.controller")
const router = express.Router()
var jwt = require('jsonwebtoken');

// verify token
const verifyJWT = (req,res,next) =>{

    const token = (req.headers.token).split(" ")[1]
    
    const  decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, function(err, decoded) {
        console.log(err) // bar
      });
      console.log(decoded)
}


router.get("/adduser", addUser) // add new user api
router.get("/user", singelUser) // show single user api
router.get("/allusers", AllUsers) // show all user api
router.get("/update", update_user) // edit or update any user
router.get("/status", update_status) // update status for active or inactive user



module.exports = router