import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
// import { fetchAllUsers } from "../Helpers/adminHelpers.js";



// admin auth
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  const tryad= await Admin.findOne({})
  const matchPassword=await admin.matchPassword(password)
      console.log(matchPassword)
  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id);
    console.log("tryad",admin)
    res.status(201).json({
      _id: admin._id,
      name: "Admin",
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


// Logout admin
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged Out" });
});

const getAllUsers = asyncHandler(async (req,res) => {
  try {
    const userData = await User.find({},{name:1,email:1});
    if(userData){
      res.status(200).json({userData})
    }else{
      res.status(401)
      throw new Error("Fetch failed");
    }
  } catch (error) {
    console.log(error.message)
  }    
})



const deleteUser = asyncHandler(async(req,res)=>{
  try {
    let userId = req.body.id;
    let userRemoved = await User.deleteOne({_id:userId});
    if(userRemoved){
      res.status(200).json({userRemoved})
    }else{
      res.status(401)
      throw new Error("failed to delete");
    }
  } catch (error) {
    console.log(error.message)
  }
})

const editUserData= asyncHandler(async(req,res)=>{
  try{
    const userId = req.params.id; 
    const userData = await User.findById(userId); 
 
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json(userData);

  }catch(error){
     console.log(error.message)
  }
})

const updateUser=asyncHandler(async(req,res)=>{
  try{
 
     const update= await User.findByIdAndUpdate(req.body.userId,{name:req.body.name,email:req.body.email})
     res.status(200).json('successful')

  }catch(error){
     console.log(error.message)
  }
})
export { authAdmin, logoutAdmin,getAllUsers,deleteUser,editUserData,updateUser };