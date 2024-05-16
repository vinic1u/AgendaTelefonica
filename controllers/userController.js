const {prisma} = require("../db/prisma");
const bcrypt = require("bcrypt");


const findUserByEmail = (email) => {
    return prisma.user.findFirst({where: {email: email}})
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

module.exports = {
    findUserByEmail,
    registerUser
}