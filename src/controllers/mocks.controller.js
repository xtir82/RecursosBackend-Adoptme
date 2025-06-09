import {createUser, createPet} from "../utils/index.js";
import user from "../dao/models/User.js";
import pet from "../dao/models/Pet.js";


const getUserMocks = async (req, res) => {
    const users = []

    for(let i=0;i< 50;i++){
        users.push(await createUser());
    }
    res.json(users);
}

const getPetMocks = async (req, res) => {
    const pets = []

    for(let i=0;i< 50;i++){
        pets.push(await createPet());
    }
    res.json(pets);
}

const postUserAndPetsMocks = async (req, res) => {
    // Obtener parámetros desde body
    const usersCount = parseInt(req.body?.users) || 1;
    const petsCount = parseInt(req.body?.pets) || 1;

    // Crear usuarios
    const createdUsers = [];
    for (let i = 0; i < usersCount; i++) {
        const userMock = await createUser();
        const createdUser = await user.create(userMock);
        createdUsers.push(createdUser);
    }

    // Crear mascotas
    const createdPets = [];
    for (let i = 0; i < petsCount; i++) {
        const petMock = await createPet();
        const createdPet = await pet.create(petMock);
        createdPets.push(createdPet);
    }

    res.json({
        status: "success",
        users: createdUsers,
        pets: createdPets
    });
}

export default {
    getUserMocks, getPetMocks, postUserAndPetsMocks
};