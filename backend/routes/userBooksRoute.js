import express from "express";
import { User } from "../models/usersModel.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = express.Router();

router.post("/booklist", authMiddleware, async (request, response) => {
  try {
    const user = await User.findById(request.user._id);
    if (user) {
      const bookId = request.body.bookId;
      const bookExists = user.books.find((id) => id === bookId);
      if (!bookExists) {
        user.books.push(bookId);
        await user.save();
        response.status(201).json({ message: "Book stored successfully" });
      } else {
        response.status(201).json({ message: "Book already stored" });
      }
    } else {
      response.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

router.delete("/booklist/:id", authMiddleware, async (request, response) => {
  try {
    const user = await User.findById(request.user._id);
    if (user) {
      const bookId = request.params.id;
      user.books = user.books.filter((id) => id !== bookId);
      await user.save();
      response.status(201).json({ message: "Book removed successfully" });
    } else {
      response.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

export default router;
