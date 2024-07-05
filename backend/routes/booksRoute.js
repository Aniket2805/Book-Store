import express from "express";
import { Books } from "../models/booksModel.js";
import validate from "../middlewares/validate-middleware.js";
import { createBookSchema } from "../validator/books-validator.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const books = await Books.find({});
    return response.status(200).send({ counts: books.length, data: books });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

router.post("/", validate(createBookSchema), async (request, response) => {
  try {
    const newBook = new Books({
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      url: request.body.url,
    });
    const book = await Books.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    return response.status(500).send(error);
  }
});
router.get("/:id", async (request, response) => {
  try {
    const book = await Books.findById(request.params.id);
    if (book === null) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ data: book });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

router.put("/:id", validate(createBookSchema), async (request, response) => {
  try {
    if (
      request.body.title === undefined ||
      request.body.author === undefined ||
      request.body.publishYear === undefined ||
      request.body.url === undefined
    ) {
      return response
        .status(400)
        .send("Title, author and publishYear are required");
    }
    const book = await Books.findById(request.params.id);
    if (book === null) {
      return response.status(404).send({ message: "Book not found" });
    }
    book.title = request.body.title;
    book.author = request.body.author;
    book.publishYear = request.body.publishYear;
    book.url = request.body.url;
    await book.save();
    return response
      .status(200)
      .send({ message: "Book updated successfully", data: book });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const book = await Books.findByIdAndDelete(request.params.id);
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
