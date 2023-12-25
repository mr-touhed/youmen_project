const express = require("express");
const { createAdmin, AdminPage,  adminLogin, checkAdmin } = require("../controller/admin.controller");
const { verifyJWT } = require("../utils/jwt");

const router = express.Router()

router.get("/admin/", AdminPage) // admin route for create user UI
router.post("/admin/create", createAdmin) // create admin user
router.post("/admin/login", adminLogin) // create admin user
router.get("/admin/check",verifyJWT, checkAdmin)

module.exports = router;