function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/auth/login");
}

function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    };
    return res.redirect("/user");
}

module.exports = {
    isLoggedIn,
    isNotLoggedIn
};