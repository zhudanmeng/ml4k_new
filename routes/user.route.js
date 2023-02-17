const router = require("express").Router();
const ProjectModel = require("../models/project.model");

router.get("/", async (req, res) => {
    const projects = await ProjectModel.find({ userId: req.user._id });

    return res.render("pages/user", {
        projects: projects,
        user: req.user,
    });
});

router.get("/project/new", async (req, res) => {
    let projectId = null;

    while (true) {
        const newPId = Math.floor(Math.random() * 100000);
        const project = await ProjectModel.findOne({ projectId: newPId });

        if (!project) {
            projectId = newPId;
            break;
        }
    }

    return res.redirect(`/gui/#${projectId}`);
});

router.post("/project/edit", async (req, res) => {
    const { projectId, value } = req.body;

    if (!projectId || !value) return res.redirect("/user");

    const project = await ProjectModel.findOneAndUpdate(
        { projectId: projectId },
        { $set: { projectName: value } },
        { new: true }
    );

    if (!project) return res.redirect("/user");
    return res.send(value);
});

router.post("/project/delete", async (req, res) => {
    const project = await ProjectModel.findOne({
        projectId: req.body.projectId,
    });
    if (!project) return res.redirect("/user");

    await project.remove();
    return res.redirect("/user");
});

module.exports = router;
