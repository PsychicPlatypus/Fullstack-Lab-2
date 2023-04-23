import express from "express";
import cors from "cors";
import favicon from "serve-favicon";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";
import BOOKS from "./books.json" assert { type: "json" };

config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"));
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(favicon(join(__dirname, "public", "public", "favicon.ico")));

app.get("/", function (_req, res) {
    res.sendFile(join(__dirname, "index.html"));
});

app.get("/book", function (_req, res) {
    res.json(BOOKS);
});

app.listen(process.env.PORT, function () {
    console.log(`Server started at port http://localhost:${process.env.PORT}/`);
});
