const express = require("express");
const { createContact, getAllContacts, getContactById,updateContact, deleteContact} = require("../services/contactService");

const router = express.Router();

router.get("/status",async (req,res) => {
    res.json({"message":"chegou aki"})
})

router.get("/contatos",async(req,res)=>{
    const contacts = await getAllContacts();
    return res.json({"message":"list of contacts",contacts})
})

router.post("/contato",async (req,res)=>{
    try{
        const contactData = req.body;
        const contact = await createContact(contactData);
        return res.json({"message" : "contact created",contact})
    }catch(error){
        return res.status(409).json({"message":"invalid body data format"})
    }
    
})

router.put("/contato/:id",async (req,res)=> {
    const contactId = Number(req.params.id);
    const contactNewData = req.body;

    const contactExist = await getContactById(contactId);

    if(!contactExist){
        return res.status(404).json({"message":`contact with id ${contactId} not found`})
    }
    const updatedContact = await updateContact(contactId,contactNewData);

    return res.status(200).json({"message": `contact with id ${contactId} updated`,updatedContact});
})

router.delete("/contato/:id",async(req,res)=> {
    const contactId = Number(req.params.id);
    
    const contactExist = await getContactById(contactId);

    if(!contactExist){
        return res.status(404).json({"message":`contact with id ${contactId} not found`})
    }

    const deletedContact = await deleteContact(contactId);
    return res.status(200).json({"message": `contact with id ${contactId} deleted`,deletedContact});
})

module.exports = {
    router
}