import express from "express";
import { createUser, getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

router.post("/login", async function (request, response) {
    //db.users.findOne({username: "tami"})
    const { username, password } = request.body;
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);

    if(!userFromDB){
        response.status(401).send({message: "Invalid Credentials"});
    } else{
        const storedPassword = userFromDB.password;   //hashed password
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        console.log("Password match is", isPasswordMatch);
        if(isPasswordMatch){
            const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);
            response.send({message: "Successfull login", token: token});
        } else{
            response.status(401).send({message: "Invalid Credentials"});
        }
    }
});

export const usersRouter = router;
