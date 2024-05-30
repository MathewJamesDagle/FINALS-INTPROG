const db = require('../_helpers/db');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};


// events.service.js
async function create(petData) {
    const { image, ...petDetails } = petData;

    try {
        const existingPet = await db.Pet.findOne({ where: { name: petDetails.name } });
        if (existingPet) {
            throw 'Pet with the same name already exists';
        }

        const pet = await db.Pet.create(petDetails);

        if (image) {
            const imagePath = await saveImage(pet.id, image);
            console.log('Saved image path:', imagePath); // Add this line

            await pet.update({ image: imagePath });
        }

        return basicDetails(pet);
    } catch (error) {
        throw error;
    }
}

async function saveImage(petId, imageData) {
    try {
        console.log('Image data:', imageData); // Log imageData for debugging

        // Validate image file extension
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const extension = path.extname(imageData.originalname);
        if (!allowedExtensions.includes(extension)) {
            throw 'Only JPG, JPEG, PNG, and GIF files are allowed';
        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        // Define file path
        const relativeImagePath = path.join('assets', imageData.filename);

        console.log('Image path:', relativeImagePath);

        // Write image data to file
       // await fs.writeFile(imagePath, imageData.buffer);

        // Return the relative path of the image
        return relativeImagePath;
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
}


async function update(id, petData) {
    const { image, ...petDetails } = petData;

    try {
        // Get the event object from the database
        const pet = await getPet(id);

        // Update event data
        await pet.update(petDetails);

        // If image is provided, update it
        if (image) {
            const imagePath = await saveImage(pet.id, image);
            await pet.update({ image: imagePath });
        }

        return basicDetails(pet);
    } catch (error) {
        throw error;
    }
}



async function getAll() {
    try {
        const pets = await db.Pet.findAll();
        return pets.map(pet => basicDetails(pet));
    } catch (error) {
        throw error;
    }
}

async function getById(id) {
    try {
        const pet = await getPet(id);
        return basicDetails(pet);
    } catch (error) {
        throw error;
    }
}

async function _delete(id) {
    try {
        const pet = await getPet(id);
        await pet.destroy();
    } catch (error) {
        throw error;
    }
}

async function getPet(id) {
    try {
        const pet = await db.Pet.findByPk(id);
        if (!pet) throw 'Pet not found';
        return pet;
    } catch (error) {
        throw error;
    }
}

function basicDetails(pet) {
    const { id, name, breed, description, sex, age, color, size, type, image } = pet;
    return { id, name, breed, description, sex, age, color, size, type, image };
}