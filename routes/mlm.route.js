const router = require("express").Router();
const MlmModel = require("../models/mlm.model.js");
const newMlm = require("../templates/empty-model.json");

router.get("/", async (req, res) => {
    const mlms = await MlmModel.find({});
    res.json(mlms);
});

router.get("/:projectId", async (req, res) => {
    let mlm = await MlmModel.findOne({
        projectId: req.params.projectId,
    });

    if (!mlm) {
        // Create a new mlm
        const new_mlm = await new MlmModel({
            projectId: req.params.projectId,
            mlmData: newMlm,
        });

        mlm = await new_mlm.save();
    }

    res.json(mlm.mlmData);
});

router.put("/:projectId", async (req, res) => {
    // FInd the mlm and update it
    let mlm = await MlmModel.findOneAndUpdate(
        { projectId: req.params.projectId },
        { mlmData: req.body },
        { new: true }
    );

    if (!mlm) {
        // Create a new mlm
        const new_mlm = await new MlmModel({
            projectId: req.params.projectId,
            mlmData: req.body,
        });
        mlm = await new_mlm.save();
    }

    res.json({
        ...mlm.toObject(),
    });
});

module.exports = router;
