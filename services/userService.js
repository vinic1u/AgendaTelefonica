const {prisma} = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const findUserByEmail = (email) => {
    return prisma.user.findUnique({where: {email: email}})
}
const registerUser = (data) => {
    const hash = bcrypt.hashSync(data.password, 10)
    return prisma.user.create({
        data : {
            email : data.email,
            password: hash
        }
    })
}


const isPasswordTheSame = (reqPassword,userPassword) => {
    return bcrypt.compareSync(reqPassword,userPassword);
}

const createUserToken = (userId,userEmail) => {
    return jwt.sign({"id":userId,"email":userEmail},process.env.SECRET)
}

const validUserToken = (userToken) => {
    return jwt.verify(userToken,process.env.SECRET);
}

module.exports = {
    findUserByEmail,
    registerUser,
    isPasswordTheSame,
    createUserToken,
    validUserToken
}