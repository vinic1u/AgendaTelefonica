const express = require("express");
const {findUserByEmail, registerUser} = require("../controllers/userController");

const router = express.Router();


router.post("/register", async (req, res) => {
    const userData = req.body;
    const userExists = await findUserByEmail(userData.email);
    if (userExists) {
        return res.status(401).json({"message":"User already exists"});
    }

    try {
        const user = await registerUser(userData);
        return res.status(200).json({"message":"registered"});
    }catch (error){
        return res.status(400).json({"message":"missing informations"});
    }
})

module.exports = {
    router
}