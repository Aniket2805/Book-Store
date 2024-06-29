import express from "express";
import { PORT, URI } from "../config.js";
import mongoose from "mongoose";
import booksRoute from "../routes/booksRoute.js";
import authRoute from "../routes/authRoute.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json("Hello World!");
});

app.use("/books", booksRoute);
app.use("/auth", authRoute);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
