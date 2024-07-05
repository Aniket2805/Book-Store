import express from "express";
import { User } from "../models/usersModel.js";
import { Books } from "../models/booksModel.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = express.Router();

router.post("/booklist", authMiddleware, async (request, response, next) => {
  try {
    const user = await User.findById(request.user._id);
    if (user) {
      const bookId = request.body.bookId;
      const bookExists = user.books.find((id) => id === bookId);
      if (!bookExists) {
        user.books.push(bookId);
        await user.save();
        user.password = undefined;
        response
          .status(201)
          .json({ message: "Book stored successfully", user });
      } else {
        response.status(201).json({ message: "Book already stored" });
      }
    } else {
      response.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/booklist/:id",
  authMiddleware,
  async (request, response, next) => {
    try {
      const user = await User.findById(request.user._id);
      if (user) {
        const bookId = request.params.id;
        user.books = user.books.filter((id) => id !== bookId);
        await user.save();
        user.password = undefined;
        response
          .status(201)
          .json({ message: "Book removed successfully", user });
      } else {
        response.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/booklist", authMiddleware, async (request, response, next) => {
  try {
    const user = await User.findById(request.user._id);
    if (user) {
      const books = await Books.find({ _id: { $in: user.books } });
      response.status(200).json(books);
    } else {
      next(new Error("User not found"));
    }
  } catch (error) {
    next(error);
  }
});

export default router;
