const express = require("express");
const router = express.Router();
const AuthGuard = require("../middlewares/auth-guard.middleware.js");

router.get("/", (req, res) => {
    return res.render("pages/index");
    // if (process.env.NODE_ENV != "development" && !req.secure) {
    //     return res.redirect("https://" + req.headers.host + req.url);
    // } else {
    //     return res.render("pages/index");
    // }
});

router.use("/auth", AuthGuard.isNotLoggedIn, require("./auth.route.js"));

router.get("/logout", AuthGuard.isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect("/");
});

router.use("/user", AuthGuard.isLoggedIn, require("./user.route.js"));

router.use("/admin", AuthGuard.isLoggedIn, require("./admin.route.js"));

// router.use("/api/mlm", require("./mlm.route.js"));
router.use("/api/mlm", AuthGuard.isLoggedIn, require("./mlm.route.js"));

// router.use("/api/project", require("./project.route.js"));
router.use("/api/project", AuthGuard.isLoggedIn, require("./project.route.js"));

router.use("/gui", AuthGuard.isLoggedIn, express.static("build"));

// 404
router.use((req, res) => res.redirect("/"));

module.exports = router;
