const express = require("express")
const { addUser, update_user, update_status, singelUser, AllUsers } = require("../controller/users.controller")
const { verifyJWT } = require("../utils/jwt")
const router = express.Router()




router.post("/adduser",verifyJWT, addUser) // add new user api
router.get("/user", singelUser) // show single user api
router.get("/allusers",verifyJWT, AllUsers) // show all user api
router.patch("/update",verifyJWT, update_user) // edit or update any user
// router.get("/status",verifyJWT, update_status) // update status for active or inactive user



module.exports = router