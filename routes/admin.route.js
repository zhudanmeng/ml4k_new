const router = require("express").Router();
const SchoolModel = require("../models/school.model");

router.get("/add-school", async (req, res) => {
    const schools = await SchoolModel.find({});
    return res.render("pages/admin/add-school", { schools });
});

router.post("/add-school", async (req, res) => {
    const { schoolName } = req.body;

    // Check if school already exists
    const school = await SchoolModel.findOne({ schoolName });
    if (school) return res.redirect("/admin/add-school");

    await new SchoolModel({ schoolName }).save();
    return res.redirect("/admin/add-school");
});

module.exports = router;
