const express = require("express");
const { createContact, getAllContacts, getContactById,updateContact, deleteContact} = require("../services/contactService");
const { auth } = require("../middlewares/auth");
const {z, ZodError} = require("zod");

const phoneRegex = /^(\+\d{1,3})?(\d{10,11})$/;

const router = express.Router();


router.get("/contatos",auth,async(req,res)=>{
    const contacts = await getAllContacts(req.user);
    return res.json({"message":"list of contacts",contacts})
})

const CreateContactSchema = z.object({
    "name" : z.string({"message":"name is required"}).min(3,"name must have more than 2 chars"),
    "email" : z.string({"message":"email is required"}).email(),
    "phone" : z.string().regex(phoneRegex,"invalid phone number format, valid formats: +55DDxxxxxxxxx or DDxxxxxxxxx")
})

router.post("/contato",auth,async (req,res)=>{
    try{
        const data = CreateContactSchema.parse(req.body);
        
        const contact = await createContact(data,req.user);
        return res.status(201).json({"message":"contact created",contact});
    }catch(error){
        if(error instanceof ZodError){
            return res.send(error.errors.map((err)=>err.message));
        }
        return res.status(500).send();
    }
})


const UpdateContactSchema = z.object({
    "name" : z.string({"message":"name is required"}).min(3,"name must have more than 2 chars").optional(),
    "email" : z.string({"message":"email is required"}).email().optional(),
    "phone" : z.string().regex(phoneRegex,"invalid phone number format, valid formats: +55DDxxxxxxxxx or DDxxxxxxxxx").optional()
})

router.put("/contato/:id",auth,async (req,res)=> {
    try{
        const contactId = Number(req.params.id);
        const contactExist = await getContactById(contactId);
        
        if(!contactExist) return res.status(404).json({"message":`Contact with id ${contactId} not found`});

        const data = UpdateContactSchema.parse(req.body);

        const updatedContact = await updateContact(contactId,data,req.user);

        return res.status(200).json({"message":"contact updated",updatedContact});
    }catch(error){
        if(error instanceof ZodError) return res.send(error.errors.map((err)=>err.message));
    
        return res.status(500).send();
    }
})

router.delete("/contato/:id",auth,async(req,res)=> {
    
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