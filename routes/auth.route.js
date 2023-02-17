const passport = require("passport");
const router = require("express").Router();
const User = require("../models/user.model.js");
const SchoolModel = require("../models/school.model");

router.get("/login", async (req, res) => {
    return res.render("pages/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/user",
        failureRedirect: "/auth/login",
    }),
    function (req, res) {
        res.send("User is " + req.user.id);
    }
);

router.get("/register", async (req, res) => {
    const schools = await SchoolModel.find({});
    return res.render("pages/register", { schools });
});

router.post("/register", async (req, res) => {
    User.register(
        new User({ username: req.body.username, school: req.body.school }),
        req.body.password,
        async (err, user) => {
            if (err) {
                console.log("Login Error: ", err, user);
                const schools = await SchoolModel.find({});
                return res.render("pages/register", { schools });
            }
            passport.authenticate("local")(req, res, () => {
                res.redirect("/user");
            });
        }
    );
});

module.exports = router;
