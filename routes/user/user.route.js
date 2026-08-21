const express = require("express")
const router = express.Router()
const {getCurrentUser, updateCurrentUser} = require("../../controllers/user/user.controller")
const authMiddleware = require("../../middlewares/auth.middleware")
const {updatePassword, deleteAccount} = require("../../controllers/user/user.controller")



router.get("/me" , authMiddleware,getCurrentUser)
router.patch("/me" , authMiddleware,updateCurrentUser)
router.post("/update-password" , authMiddleware , updatePassword)
router.delete("/delete-user-account/:id" , authMiddleware , deleteAccount)

module.exports = router