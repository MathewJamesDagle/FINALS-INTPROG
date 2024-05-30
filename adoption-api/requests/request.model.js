const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        accountId: { type: DataTypes.INTEGER, allowNull: false },
        petId: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    };

    const options = {
        timestamps: false // Optionally, you can define timestamps behavior here
    };

    return sequelize.define('request', attributes, options);
}