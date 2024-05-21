const express = require("express");
const {findUserByEmail, registerUser, isPasswordTheSame, createUserToken} = require("../services/userService");
const {z, ZodError} = require("zod");
const router = express.Router();

const UserSchema = z.object({
    email : z.string({
        "message" : "missing email value"
    }).email(),
    password : z.string({
        "message" : "missing password value"
    }).min(6,"password must have more than 6 chars")
})


router.post("/register", async (req, res) => {
    try{
        const data = UserSchema.parse(req.body);
        
        const userExists = await findUserByEmail(data.email);
        if(userExists){
            return res.status(409).json({"message":"user already exists"});
        }


        const user = await registerUser(data);
        delete user.password;
        
        return res.status(201).json({"message":"registred",user});
    }catch(error){
        if(error instanceof ZodError){
            return res.send(error.errors.map((err)=> err.message));
        }
        return res.status(500).send();
    }

})


router.post("/login",async(req,res)=>{
    
    try{
        const data = UserSchema.parse(req.body);

        const userExists = await findUserByEmail(data.email);

        if(!userExists){
            return res.status(401).json({"message":"invalid credentials"}); 
        }

        const validPassword = await isPasswordTheSame(data.password,userExists.password);

        if(!validPassword){
            return res.status(401).json({"message":"invalid credentials"}); 
        }

        const userToken = await createUserToken(userExists.id,userExists.email);
        return res.status(200).json({"message":"Logged",userToken});
    }catch(error){
        if(error instanceof ZodError){
            return res.send(error.errors.map((err)=>err.message));
        }
        return res.status(500).send();
    }

})

module.exports = {
    router
}