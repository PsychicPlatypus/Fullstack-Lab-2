import mongoose from "mongoose";
import Books from "./models/books.js";
import { config } from "dotenv";

config();
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
const mongoDB = process.env.ATLAS_URI;

export async function getAllBooks() {
    await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const books = await Books.find({});
    return books;
}
