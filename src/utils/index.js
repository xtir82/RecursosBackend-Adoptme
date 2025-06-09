import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { faker } from "@faker-js/faker"

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const createUser = async () =>{
    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await createHash("coder123"),
        role: Math.random() < 0.5 ? "admin" : "user",
        pets: []
    }
}

export const createPet = async () =>{
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.birthdate(),
        adopted: false,
        owner: null,
        image: faker.image.url()
    }
}