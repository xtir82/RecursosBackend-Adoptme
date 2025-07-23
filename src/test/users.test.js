import mongoose from "mongoose";
import dotenv from "dotenv";

import assert from "assert";
//Assert es un modulo nativo de NODE que nos permite hacer las validaciones

import Users from "../dao/Users.dao.js";

dotenv.config();

let usersDao;

describe("Users DAO Tests", function () {

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        usersDao = new Users();
    });

    after(async () => {
        await mongoose.disconnect();
    });

    it("El get de usuarios debe retornar un array", async () => {
        const users = await usersDao.get();
        assert.strictEqual(Array.isArray(users), true, "El resultado debe ser un array");
    });
});
