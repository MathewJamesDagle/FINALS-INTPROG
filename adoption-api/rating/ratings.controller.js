const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const ratingService = require('./rating.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    ratingService.getAll()
        .then(ratings => res.json(ratings))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own account and admins can get any account
    if (req.auth.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    ratingService.getById(req.params.id)
        .then(rating => rating ? res.json(rating) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        message: Joi.string().required(),
        rate: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    ratingService.create(req.body)
        .then(rating => res.json(rating))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Join.object({
        name: Joi.string().required(),
        message: Joi.string().required(),
        rate: Joi.string().required(),
    });

    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own account and admins can update any account
    if (req.auth.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    ratingService.update(req.params.id, req.body)
        .then(rating => res.json(rating))
        .catch(next);
}

function _delete(req, res, next) {
    ratingService.delete(req.params.id)
        .then(() => res.json({ message: 'Account deleted successfully' }))
        .catch(next);
}