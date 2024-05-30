const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false, trim: true },
        message: { type: DataTypes.STRING, allowNull: false },
        rate: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
    };

    return sequelize.define('rating', attributes);
}