const db = require('../_helpers/db');

module.exports = {
    create,
    getAll,
    getByAccountId,
    updateStatus,
    delete: _delete
};

async function create(accountId, petId) {
    try {
        const existingRequest = await db.Request.findOne({ where: { accountId, petId } });
        if (existingRequest) {
            throw 'Request already exists';
        }

        await db.Request.create({ accountId, petId });
    } catch (error) {
        console.error('Error creating request:', error);
        throw error;
    }
}

async function getAll() {
    return await db.Request.findAll();
}

async function getByAccountId(accountId) {
    return await db.Request.findAll({ where: { accountId } });
}

async function updateStatus(id) {
    const request = await getRequest(id);

    request.status = true;
    await request.save();
}

async function _delete(id) {
    const request = await getRequest(id);
    await request.destroy();
}

async function getRequest(id) {
    const request = await db.Request.findByPk(id);
    if (!request) throw 'Request not found';
    return request;
}
