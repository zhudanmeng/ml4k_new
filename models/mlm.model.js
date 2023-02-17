const mongoose = require("mongoose");

const mlmSchema = new mongoose.Schema(
    {
        projectId: {
            type: Number,
            unique: true,
            required: true,
        },
        mlmData: Object,
    },
    {
        timestamps: true,
        minimize: false,
    }
);

// Export the model
module.exports = mongoose.model("mlm", mlmSchema);
