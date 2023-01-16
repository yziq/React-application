import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import path from "path";
import vote from "./routes/api/vote";
import routes from "./routes/index";


var cookieParser = require("cookie-parser");
var logger = require("morgan");

const expressSession = require("express-session");

var app = express();

require("dotenv").config();

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
};

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, '../public')));

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === "production") {
    console.log("Running in production!");
    app.use(express.static(path.join(__dirname, "../../frontend/build")));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
    });
}

app.use(expressSession(session));

app.use(vote);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use("/", routes);


console.log(`env:${app.get('env')}`)
if (app.get("env") !== "test") {
    mongoose.connect(
        "mongodb+srv://sgon308:Happy123*@cluster0.xqnh4.mongodb.net/cs732?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    );
}


export default app;
