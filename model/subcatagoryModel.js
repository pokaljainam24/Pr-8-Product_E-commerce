const { default: mongoose } = require("mongoose");


const subCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'catagory', 
      required: true
    }
  });

const subCatagory = mongoose.model("subCatagory", subCategorySchema);
module.exports = subCatagory;