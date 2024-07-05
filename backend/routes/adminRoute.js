import express from "express";
import { User } from "../models/usersModel.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = express.Router();

router.get("/users", authMiddleware, async (req, res, next) => {
  try {
    const users = await User.find().select({ password: 0 });
    if (req.user.isAdmin) {
      return res.status(200).send(users);
    }
    next(new Error("Unauthorized access! Only Admin can access this route"));
  } catch (error) {
    next(error);
  }
});
router.delete("/users/:id", authMiddleware, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        return res.status(200).send({ message: "User removed successfully!" });
      }
      return res.status(404).send({ message: "User not found!" });
    }
    next(new Error("Unauthorized access! Only Admin can access this route"));
  } catch (error) {
    next(error);
  }
});
router.put("/users/:id", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.user.isAdmin) {
      if (user) {
        user.isAdmin = !user.isAdmin;
        await user.save();
        return res.status(200).send({ message: "User updated successfully!" });
      }
      return res.status(404).send({ message: "User not found!" });
    }
    next(new Error("Unauthorized access! Only Admin can access this route"));
  } catch (error) {
    next(error);
  }
});

export default router;
