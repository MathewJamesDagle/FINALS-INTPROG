const express = require('express'); 
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request'); 
const authorize = require('_middleware/authorize');
const petService = require('./pet.service');
const upload = require('_middleware/multer-config'); // Import multer configuration

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', upload.single('image'), createSchema, create); // Handle image upload for create
router.put('/:id', upload.single('image'), updateSchema, update); // Handle image upload for update
router.delete('/:id', _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        breed: Joi.string().required(),
        description: Joi.string().required(),
        sex: Joi.string().required(),
        age: Joi.string().required(),
        color: Joi.string().required(),
        size: Joi.string().required(),
        type: Joi.string().required(),
        image: Joi.any().optional() // Optional for create, as multer handles it
    });
    validateRequest(req, next, schema);
}


function create(req, res, next) {
    // Extract image file path from req.file
    const image = req.file ? req.file : null;

    // Log the file details for debugging
    console.log('Uploaded file:', req.file);

    
    petService.create({ ...req.body, image }) // Pass image path to service
        .then(event => res.status(201).json(event))
        .catch(next);
}

function getAll(req, res, next) {
    petService.getAll()
        .then(pets => res.json(pets))
        .catch(next);
}

function getById(req, res, next) {
    petService.getById(req.params.id)
        .then(pet => pet ? res.json(pet) : res.sendStatus(404))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        breed: Joi.string().empty(''),
        description: Joi.string().empty(''),
        sex: Joi.string().empty(''),
        age: Joi.string().empty(''),
        color: Joi.string().empty(''),
        size: Joi.string().empty(''),
        type: Joi.string().empty(''),
        image: Joi.any().optional() // Optional for update, as multer handles it
    });
    validateRequest(req, next, schema); 
}

function update(req, res, next) {
    // Extract image file path from req.file
    const image = req.file ? req.file : null;

    // Log the file details for debugging
    console.log('Uploaded file:', req.file);

    petService.update(req.params.id, { ...req.body, image }) // Pass image path to service
        .then(() => res.json({ message: 'Pet updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    petService.delete(req.params.id)
        .then(() => res.json({ message: 'Pet deleted successfully' }))
        .catch(next);
}