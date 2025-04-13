const catagoryModel = require('../model/catagoryModel');
const subCatagoryModel = require('../model/subcatagoryModel');
const extraCatagoryModel = require('../model/extracatagoryModel');


module.exports.openClientHomepage = async (req, res) => {
    try {
        const categories = await catagoryModel.find();
        const subCategories = await subCatagoryModel.find();
        const extraCategories = await extraCatagoryModel.find();

        res.render("Ewebpage.ejs", {
            categories,
            subCategories,
            extraCategories
        });
    } catch (err) {
        console.log("Error loading homepage:", err);
        res.status(500).send("Server Error");
    }
};

module.exports.openCategoryPage = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await catagoryModel.findById(categoryId);
        res.render('pages/singlePage', {
            categories: [category],
            subCategories: [],
            extraCategories: [],
        });
    } catch (err) {
        console.log("Error loading category:", err);
        res.status(500).send("Server Error");
    }
};


module.exports.openSubCategoryPage = async (req, res) => {
    const subCategoryId = req.params.id;
    try {
        const subCategory = await subCatagoryModel.findById(subCategoryId);

        if (!subCategory) {
            return res.status(404).send("Subcategory not found");
        }

        res.render('pages/singlePage', {
            categories: [],
            subCategories: [subCategory],
            extraCategories: [],
        });
    } catch (err) {
        console.log("Error loading subcategory:", err);
        res.status(500).send("Server Error");
    }
};



module.exports.openExtraCategoryPage = async (req, res) => {
    const extraCategoryId = req.params.id;
    try {
        const extraCategory = await extraCatagoryModel.findById(extraCategoryId);
        res.render('pages/singlePage', { 
            categories: [],
            subCategories: [],
            extraCategories: [extraCategory], 
        });
    } catch (err) {
        console.log("Error loading extra category:", err);
        res.status(500).send("Server Error");
    }
};




