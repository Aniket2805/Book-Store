import express from "express";
import { User } from "../models/usersModel.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = express.Router();

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 });
    if (req.user.isAdmin) {
      return res.status(200).send(users);
    }
    return res
      .status(401)
      .send({ Error: "Unauthorized access. User is not an admin..." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
