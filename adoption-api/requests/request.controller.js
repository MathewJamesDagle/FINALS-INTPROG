const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize');
const requestService = require('./request.service');

router.post('/', authorize(), create);
router.get('/', authorize(), getAll);
router.get('/admin', authorize(), getAllRequests);
router.get('/user/:accountId', authorize(), getByAccountId);
router.put('/status/:id', authorize(), updateStatus); // Add this line
router.delete('/:id', authorize(), _delete);

module.exports = router;

function create(req, res, next) {
    requestService.create(req.user.id, req.body.petId)
        .then(() => res.json({ message: 'Request created successfully' }))
        .catch(error => {
            console.error('Error in request creation:', error);
            res.status(500).json({ message: error.toString() });
        });
}

function getAll(req, res, next) {
    const accountId = req.user.id;
    requestService.getByAccountId(accountId)
        .then(requests => res.json(requests))
        .catch(next);
}

function getAllRequests(req, res, next) {
    requestService.getAll()
        .then(requests => res.json(requests))
        .catch(next);
}

function getByAccountId(req, res, next) {
    requestService.getByAccountId(req.params.accountId)
        .then(requests => res.json(requests))
        .catch(next);
}

function updateStatus(req, res, next) {
    requestService.updateStatus(req.params.id)
        .then(() => res.json({ message: 'Status updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    requestService.delete(req.params.id)
        .then(() => res.json({ message: 'Request deleted successfully' }))
        .catch(next);
}
