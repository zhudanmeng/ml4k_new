const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        projectId: {
            type: Number,
            unique: true,
            required: true,
        },
        projectName: {
            type: String,
            unique: false,
            default: "untitled",
        },
        projectData: Object,
    },
    {
        timestamps: true,
        minimize: false,
    }
);

// Export the model
module.exports = mongoose.model("project", projectSchema);
