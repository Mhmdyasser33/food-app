const express = require("express")
const router = express.Router()
const getUser = require("../../controllers/user/user.controller")
const authMiddleware = require("../../middlewares/auth.middleware")


router.get("/getUser" , authMiddleware,getUser)

module.exports = router