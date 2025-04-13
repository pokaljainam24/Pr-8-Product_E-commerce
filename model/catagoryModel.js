const { default: mongoose } = require("mongoose");

const catagorySchema = new mongoose.Schema({
    name: String,
    image: String,
});

const catagory = mongoose.model("catagory", catagorySchema);
module.exports = catagory;