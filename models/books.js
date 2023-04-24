import { Schema, model } from "mongoose";
const BookSchema = new Schema(
    {
        id: {
            type: "Number",
        },
        title: {
            type: "String",
        },
        author: {
            type: "String",
        },
        description: {
            type: "String",
        },
        category: {
            type: "String",
        },
        price: {
            type: "Number",
        },
    },
    { collection: "books" }
);

const Book = model("Book", BookSchema);

export default Book;
