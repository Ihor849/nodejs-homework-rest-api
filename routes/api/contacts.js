const express = require("express");
// const Joi = require("joi");
// const contacts = require("../../models/contacts");
// const {HttpError} = require("../../helpers");

const ctrl = require("../../controllers/contacts");
const {validateBody}=require("../../middlewares");
const schemas = require("../../schemas/contacts")

const router = express.Router();

// const addSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     phone: Joi.string().required(),
// })

// router.get("/", async(req, res,next) => {
//     try {
//         const result = await contacts.listContacts();
//         res.json(result);
//     }
//     catch(error) {
//         next(error)
//     }
// })
router.get("/", ctrl.getAllContact) 


// router.get("/:id", async (req, res,next) => {
//   // console.log(req.params);
//   try {
//     const { id } = req.params;
//     const result = await contacts.getContactById(id);
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }
//     res.json(result);

//   } catch (error) {
//     next(error)
//     // const{status = 500, message = "Server error"}= error;
//     // res.status(status).json({
//     //     message,
//     // })

//     // res.status(500).json({
//     //   message: "Server error",
//     // });
//   }
// });
router.get("/:id",ctrl.getContactById);


// router.post("/", async (req, res, next) => {
//     try { 
//         const {error} = addSchema.validate(req.body);
//         if(error){
//         throw HttpError(400, error.message)
//         }
//         const result = await contacts.addContact(req.body);
//         res.status(201).json(result)
//     } catch (error) {
//         next(error)
//     }
  
// })
router.post("/", validateBody(schemas.addSchema), ctrl.addContact)

// router.delete('/:id', async (req, res, next) => {
//     try {
//         const {id} = req.params;
//         const result= await contacts.removeContact(id);
//         if(!result){
//             throw HttpError(400, "Not found")
//         }
//         res.json({message: "Delete success"});
//     } catch (error) {
//        next(error);
//     }
  
// })
router.delete('/:id', ctrl.deleteContactById)


// router.put('/:id', async (req, res, next) => {
//     try {
//         const {error} = addSchema.validate(req.body);
//         if(error){
//         throw HttpError(400, error.message);
//         }
//         const {id} = req.params;
//         const result = await contacts.updateContact(id, req.body);
//         if(!result){
//         throw HttpError(404, "Not found" )
//         }
//         res.json(result)
//     } catch (error) {
//         next(error);
//     }
  
// })
router.put('/:id',validateBody(schemas.addSchema), ctrl.updateContactById);
module.exports = router;
