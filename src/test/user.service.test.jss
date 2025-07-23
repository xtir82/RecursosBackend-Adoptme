import { expect } from "chai";
import { usersService } from "../services/index.js";

describe("User Service - Unit", () => {
    let userService;
    let createUser;

    before(() => {
        userService = new usersService
        
        createUser = userService.createUser;
    });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const userData = {
        email: "test@example.com",
        password: "password",
      };
      const user = await usersService.createUser(userData);
      expect(user).to.have.property("_id");
      expect(user.email).to.equal(userData.email);
    });
  });
});