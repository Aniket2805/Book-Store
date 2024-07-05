import { z } from "zod";

const createBookSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(4, { message: "Title must be at least 4 characters" })
    .max(255, { message: "Title must not be more than 255 characters" }),
  author: z
    .string({ required_error: "Author is required" })
    .min(4, { message: "Author must be at least 4 characters" })
    .max(255, { message: "Author must not be more than 255 characters" }),
  publishYear: z
    .number({ required_error: "Publish year is required" })
    .int({ message: "Publish year must be an integer" })
    .min(1900, { message: "Publish year must be at least 1900" })
    .max(2099, { message: "Publish year must not be more than 2099" }),

  url: z
    .string({ required_error: "URL is required" })
    .url({ message: "Invalid URL" })
    .min(5, { message: "URL must be at least 5 characters" })
    .max(255, { message: "URL must not be more than 255 characters" }),
});

export { createBookSchema };
