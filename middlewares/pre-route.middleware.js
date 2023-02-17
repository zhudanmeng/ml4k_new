const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const User = require("../models/user.model.js");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (app) => {
    // Express Session setup
    app.use(
        session({
            secret: "secret",
            resave: false,
            saveUninitialized: false,
        })
    );

    // set the view engine to ejs
    app.set("view engine", "ejs");
    app.set("views", "./server/views");

    // Build a static server for build files
    app.use(
        cors({
            origin: [
                "http://localhost:8601",
                "https://scratch.brilliantlabs.ca",
            ],
            credentials: true,
        })
    );

    // Tell express to recognize the incoming Request Object as a JSON Object
    app.use(express.json({ limit: "10mb" }));

    app.use(express.static("dist"));
    app.use(express.static("translations"));

    // Express body parser
    app.use(express.urlencoded({ extended: true }));

    // Passport Setup
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    return app;
};
