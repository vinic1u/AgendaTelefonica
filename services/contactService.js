const {prisma} = require("../db/prisma");


const createContact = (data) => {
    return prisma.contact.create({
        data : {
            name : data.name,
            phone : data.phone,
            email : data.email
        }
    })
}

const getAllContacts = () => {
    return prisma.contact.findMany();
}

const getContactById = (id) => {
    return prisma.contact.findUnique({
        where : {
            id : id
        }
    })
}

const updateContact = (id,newData) => {
    const contact = prisma.contact.update({
        data : newData,
        where : {
            id : id
        }
    })
    return contact
}

const deleteContact = (id) => {
    const contact = prisma.contact.delete({
        where : {
            id : id
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