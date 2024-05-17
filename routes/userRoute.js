const express = require("express");
const {findUserByEmail, registerUser, isPasswordTheSame, createUserToken} = require("../services/userService");

const router = express.Router();


router.post("/register", async (req, res) => {
    try{
        const userData = req.body;
        const userExists = await findUserByEmail(userData.email);
        
        if(userExists){
            return res.status(409).json({"message":"user already exists"})
        }

        const user = await registerUser(userData);
        delete user.password
        return res.status(200).json({"message":"registred",user})
    
    }catch(error){
        return res.status(400).json({"message":"missing data body values"})
    }
})


router.post("/login",async(req,res)=>{
    try{
        const data = req.body;
        
        const userFinded = await findUserByEmail(data.email);
        if(!userFinded){
            return res.status(401).json({"message":"invalid credentials"})
        }

        const isPasswordValid = await isPasswordTheSame(data.password,userFinded.password);
        if(!isPasswordValid){
            return res.status(401).json({"message":"invalid credentials"})
        }

        delete userFinded.password;

        const userToken = await createUserToken(userFinded.id,userFinded.email);
        return res.status(200).json({"message":"Login Successful","token": userToken})
    }catch(error){
        return res.status(400).json({"message":"missing data body values"})
    }
})

module.exports = {
    router
}