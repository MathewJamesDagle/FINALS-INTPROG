const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        breed: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        sex: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: true } // Change the type to STRING to store the image path
    };

    const options = {
        timestamps: false // Optionally, you can define timestamps behavior here
    };

    return sequelize.define('pet', attributes, options);
}