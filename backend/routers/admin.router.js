const express = require("express");
const { createAdmin, AdminPage, showAllUsers, adminLogin } = require("../controller/admin.controller");
const router = express.Router()

router.get("/admin/", AdminPage) // admin route for create user UI
router.post("/admin/create", createAdmin) // create admin user
router.post("/admin/login", adminLogin) // create admin user


module.exports = router;