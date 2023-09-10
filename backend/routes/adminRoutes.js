import express from "express";
import { authAdmin,logoutAdmin,getAllUsers,deleteUser, editUserData, updateUser } from "../controller/adminController.js";


const router = express.Router();


router.post('/login',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',getAllUsers)
router.post('/delete-user',deleteUser)
router.get('/edit-user/:id',editUserData)
router.put('/update-user',updateUser)
   



export default router;