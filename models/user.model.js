const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        school: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
