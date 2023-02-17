const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
    {
        schoolName: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model("school", schoolSchema);
