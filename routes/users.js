import express from "express";
import { createUser } from "../helper.js";
import bcrypt from "bcrypt";

const router = express.Router();

async function genPassword(password) {
    // bcrypt.genSalt(NoOfRounds)
    const salt = await bcrypt.genSalt(10); // 4s
    const hashPassword = await bcrypt.hash(password, salt); // salt + "password@123"
    console.log({ salt, hashPassword });
    return hashPassword;
  }

router.post("/signup", async function (request, response) {
    //db.users.insertOne(data)
    const { username, password } = request.body;
    const hashPassword = await genPassword(password);
    const newUser = {
        username: username,
        password: hashPassword,
    };
    console.log(newUser);
    const result = await createUser(newUser);
    response.send(result);
});

export const usersRouter = router;
