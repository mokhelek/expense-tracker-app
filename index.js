import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session";
import expenseTrackerRoutes from "./routes/main.js";
import "dotenv/config";

let app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(
    session({
        secret: "<add a secret string here>",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/", expenseTrackerRoutes);


let PORT = process.env.PORT | 3001;
app.listen(PORT, function () {
    console.log(" 🚀 Taking off on port ", PORT);
});