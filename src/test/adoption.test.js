import supertest from "supertest";
import chai from "chai";
import { createPet, createUser } from "../utils/index.js";
import UserModel from "../dao/models/User.js";
import PetModel from "../dao/models/Pet.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../app.js";

const expect = chai.expect;

dotenv.config();

const requester = supertest(app);

//Se utilizan 2 describes, uno para la app y otro para cada entidad interna

describe("Testing de la App Web Adoptame", () => {
    describe("Testing de Adoption", () => {
        before(async () => {
            await mongoose.connect(process.env.MONGODB_URI);
        });

        after(async () => {
            await mongoose.disconnect();
        });
        
        it("Endpoint GET /api/adoptions debe retornar un array de adopciones", async () => {
            const {statusCode, ok, _body} = await requester
                .get("/api/adoptions")

            expect(statusCode).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(Array.isArray(_body.payload)).to.be.true;
        })

        it("Endpoint GET /api/adoptions/:aid debe retornar una adopcion por ID", async () => {
            const {statusCode, ok, _body} = await requester
                .get("/api/adoptions/6876a246b1a327f448786617")

            expect(statusCode).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.be.an("object");
        })

        it("Endpoint GET /api/adoptions/:aid debe retornar 404 si la adopcion no existe", async () => {
            const {statusCode, ok, _body} = await requester
                .get("/api/adoptions/6876a246b1a327f448786618")
            
            expect(statusCode).to.equal(404);
            expect(_body.status).to.equal("error");
            expect(_body.error).to.equal("Adopcion no encontrada");
        })

        it("Endpoint POST /api/adoptions/:uid/:pid debe crear una adopcion", async () => {
            const userData = await createUser();
            const petData = await createPet();

            const userMock = await UserModel.create(userData);
            const petMock = await PetModel.create(petData);

            const {statusCode, ok, _body } = await requester
                .post(`/api/adoptions/${userMock._id}/${petMock._id}`)

            expect(statusCode).to.equal(200);
        })

        it("Endpoint POST /api/adoptions/:uid/:pid debe retornar 404 si el usuario no existe", async () => {
            this.timeout(10000);
            const petData = await createPet();
            const petMock = await PetModel.create(petData);

            const {statusCode, ok, _body} = await requester
                .post(`/api/adoptions/e482ba1b68216034ef2cc792/${petMock._id}`)

            expect(statusCode).to.equal(404);
            expect(_body.status).to.equal("error");
            expect(_body.error).to.equal("Usuario no encontrado");
        })

        it("Endpoint POST /api/adoptions/:uid/:pid debe retornar 404 si la mascota no existe", async () => {
            this.timeout(10000);
            const userData = await createUser();
            const userMock = await UserModel.create(userData);

            const {statusCode, ok, _body} = await requester
                .post(`/api/adoptions/${userMock._id}/22d37cd610ae9efc01de8f05`)

            expect(statusCode).to.equal(404);
            expect(_body.status).to.equal("error");
            expect(_body.error).to.equal("Mascota no encontrada");
        })

        it("Endpoint POST /api/adoptions/:uid/:pid debe retornar 400 si la mascota ya fue adoptada", async () => {
            const userData = await createUser();
            const petData = await createPet();

            const userMock = await UserModel.create(userData);
            const petMock = await PetModel.create(petData);

            // Adoptar la mascota una vez
            await requester.post(`/api/adoptions/${userMock._id}/${petMock._id}`);

            // Intentar adoptar la misma mascota nuevamente
            const {statusCode, ok, _body} = await requester
                .post(`/api/adoptions/${userMock._id}/${petMock._id}`)

            expect(statusCode).to.equal(400);
            expect(_body.status).to.equal("error");
            expect(_body.error).to.equal("Mascota ya adoptada");
        })


    })
})

