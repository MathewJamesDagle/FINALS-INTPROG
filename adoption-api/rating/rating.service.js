const config = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const ratings = await db.Rating.findAll();
    return ratings.map(x => basicDetails(x));
}

async function getById(id) {
    const rating = await getrating(id);
    return basicDetails(rating);
}

async function create(params) {
    const rating = new db.Rating(params);

    // save account
    await rating.save();

    return basicDetails(rating);
}

async function update(id, params) {
    const rating = await getRating(id);

    // copy params to account and save
    Object.assign(rating, params);
    rating.updated = Date.now();
    await rating.save();

    return basicDetails(rating);
}

async function _delete(id) {
    const rating = await getRating(id);
    await rating.destroy();
}

// helper functions

async function getRating(id) {
    const rating = await db.Rating.findByPk(id);
    if (!rating) throw 'Account not found';
    return rating;
}

function basicDetails(rating) {
    const { id, name, message, rate } = rating;
    return { id, name, message, rate };
}