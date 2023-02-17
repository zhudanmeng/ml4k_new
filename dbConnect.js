const mongoose = require("mongoose");

const databaseURI =
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:DybpakINp7vyaw9F@cluster0.9babd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
    databaseURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, data) => {
        if (err) {
            console.error("<::: Couldn't connect to database", err);
        } else {
            console.log(`:::> Connected to MongoDB database. ${databaseURI}`);
        }
    }
);
