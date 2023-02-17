const router = require("express").Router();
const ProjectModel = require("../models/project.model");
const newProject = require("../templates/empty-project.json");

router.get("/", async (req, res) => {
    const projects = await ProjectModel.find({});
    res.json(projects);
});

router.get("/:projectId", async (req, res) => {
    let project = await ProjectModel.findOne({
        projectId: req.params.projectId,
    });

    if (!project) {
        // Create a new project
        const new_project = await new ProjectModel({
            userId: req.user._id,
            projectId: req.params.projectId,
            projectData: newProject,
        });

        project = await new_project.save();
    }

    res.json(project.projectData);
});

router.put("/:projectId", async (req, res) => {
    // FInd the project and update it
    const project = await ProjectModel.findOneAndUpdate(
        { projectId: req.params.projectId },
        { projectData: req.body },
        { new: true }
    );

    res.json({
        ...project,
    });
});

module.exports = router;
