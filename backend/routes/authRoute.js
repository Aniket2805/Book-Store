import express from "express";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validate from "../middlewares/validate-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { signupSchema, signinSchema } from "../validator/auth-validator.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (user !== null) {
      return response.status(409).send({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const newUser = new User({
      name: request.body.name,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, salt),
    });
    const createdUser = await User.create(newUser);
    const token = jwt.sign(
      {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );
    return response.status(201).send({
      message: "Signed Up successfully",
      userId: createdUser._id.toString(),
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

router.post("/signin", validate(signinSchema), async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (user === null) {
      return response.status(404).send({ message: "User not found" });
    }
    const passwordIsValid = bcrypt.compareSync(
      request.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return response.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );
    return response.status(200).send({
      message: "Signed In successfully",
      userId: user._id.toString(),
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

router.get("/user", authMiddleware, async (request, response) => {
  try {
    const userData = request.user;
    const user = await User.findById(userData._id);
    return response.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
export default router;
