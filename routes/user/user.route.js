const express = require("express")
const router = express.Router()
const {getCurrentUser, updateCurrentUser} = require("../../controllers/user/user.controller")
const authMiddleware = require("../../middlewares/auth.middleware")


router.get("/me" , authMiddleware,getCurrentUser)
router.patch("/me" , authMiddleware,updateCurrentUser)

module.exports = router