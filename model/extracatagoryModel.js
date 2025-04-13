const { default: mongoose } = require("mongoose");

const extraCatagorySchema = new mongoose.Schema({
    name: String,
    image: String,
    catagoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catagory",
    },
    subCatagoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCatagory",
    },
});

const Extracatagory = mongoose.model("extracatagory", extraCatagorySchema);
module.exports = Extracatagory;