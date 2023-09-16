const mongoose = require("mongoose");

const mongodb = (url) => {
    return mongoose
            .connect(url)
            .then((data) => console.log("Connection to MongoDB has been Established😇😇"))
            .catch((err)=> console.log("Could not Connect to MongoDB database"))
}


module.exports = mongodb