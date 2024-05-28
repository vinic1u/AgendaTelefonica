const {prisma} = require("../db/prisma");


const createContact = (data,userId) => {
    return prisma.contact.create({
        data : {
            name : data.name,
            phone : data.phone,
            email : data.email,
            userId : userId
        }
    })
}

const getAllContacts = (userId) => {
    return prisma.contact.findMany({
        where : {
            userId : userId
        },
        select : {
            id : true,
            name : true,
            phone : true,
            email : true,
            userId : false
        }
    });
}

const getContactById = (id,userId) => {
    return prisma.contact.findUnique({
        where : {
            id : id,
            userId : userId
        }
    })
}

const updateContact = (id,newData,userId) => {
    const contact = prisma.contact.update({
        data : newData,
        where : {
            id : id,
            userId : userId
        }
    })
    return contact
}

const deleteContact = (id,userId) => {
    const contact = prisma.contact.delete({
        where : {
            id : id,
            userId : userId
        }
    })
    return contact
}

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
}