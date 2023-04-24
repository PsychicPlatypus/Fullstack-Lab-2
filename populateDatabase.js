import BOOKS from "./books.json" assert { type: "json" };
import mongoose from "mongoose";
import Book from "./models/books.js";
import { config } from "dotenv";

config();
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
const mongoDB = process.env.ATLAS_URI;
main().catch((err) => console.log(err));

async function populate() {
    await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    if ((await Book.countDocuments().exec()) > 0) {
        console.log("Database already populated");
        return;
    }

    const books_ = BOOKS;

    for (let i = 0; i < books_.length; i++) {
        const books = new Book(books_[i]);
        await books.save();
    }
}

async function main() {
    try {
        console.log(`Connecting to Database: ${process.env.ATLAS_URI}`);
        await mongoose.connect(mongoDB);
        await populate();
        console.log("Debug: Closing mongoose");
    } catch (error) {
        console.log(`Script failed unexpectedly, reason: \n${error}`);
    } finally {
        mongoose.connection.close();
    }
}
