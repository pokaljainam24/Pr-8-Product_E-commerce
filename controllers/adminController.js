const catagoryModel = require('../model/catagoryModel');
const subCatagoryModel = require('../model/subcatagoryModel');
const extraCatagoryModel = require('../model/extracatagoryModel');
const path = require('path');
const fs = require('fs');
const User = require('../model/adminAuthModel');
const passport = require('../middleware/passport-local');

module.exports.loginSuccess = (req, res) => {
    req.flash("success", "Login successfully..😎");
    return res.redirect("/home");
}

//-1 open dashboard page
module.exports.openDashBoardPage = async (req, res) => {
    try {
        const categories = await catagoryModel.find();
        const subCategories = await subCatagoryModel.find();
        const extraCategories = await extraCatagoryModel.find();

        return res.render("pages/AdminHome.ejs", {
            categories,
            subCategories,
            extraCategories
        });
    } catch (err) {
        console.log("Error loading dashboard data:", err);
        res.status(500).send("Server Error");
    }
};


//-2 open add category page
module.exports.openAddProductPage = async (req, res) => {
    try {
        const categories = await catagoryModel.find();
        const subCategories = await subCatagoryModel.find();

        return res.render("pages/form.ejs", {
            categories,
            subCategories
        });
    } catch (err) {
        console.log("Error fetching categories/subcategories:", err);
        res.status(500).send("Server Error");
    }
};


//-3 addcat, subcat, extra catagory controller
module.exports.addCategory = async (req, res) => {
    try {
        const catData = await catagoryModel.create({ ...req.body, image: req.file.path });
        return res.redirect('/addProduct');
    } catch (err) {
        console.log("Error adding category:", err);
        return res.redirect('/addProduct');
    }
};

//-4 add subcatagory controller
module.exports.addSubCategory = async (req, res) => {
    try {
        const imagePath = req.file ? req.file.path : null;

        const subCatData = await subCatagoryModel.create({
            ...req.body,
            image: imagePath,
            categoryId: req.body.categoryId
        });

        return res.redirect('/addProduct');
    } catch (err) {
        console.log("Error adding subcategory:", err);
        return res.redirect('/addProduct');
    }
};

//-5 add extra catagory controller
module.exports.addExtraCategory = async (req, res) => {
    try {
        const imagePath = req.file ? req.file.path : null;

        const extraCatData = await extraCatagoryModel.create({
            ...req.body,
            image: imagePath,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId
        });

        return res.redirect('/addProduct');
    } catch (err) {
        console.log("Error adding extra category:", err);
        return res.redirect('/addProduct');
    }
};


//-6 view all categories
module.exports.viewAllCategories = async (req, res) => {
    try {
        const categories = await catagoryModel.find();
        const subCategories = await subCatagoryModel.find();
        const extraCategories = await extraCatagoryModel.find();

        return res.render("pages/viewAllData.ejs", {
            categories: categories,
            subCategories: subCategories,
            extraCategories: extraCategories
        });
    } catch (err) {
        console.log("Error fetching data:", err);
        res.status(500).send("Server Error");
    }
};

//-7 delete category controller
module.exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await catagoryModel.findById(id);

        await subCatagoryModel.deleteMany({ categoryId: id });
        await extraCatagoryModel.deleteMany({ categoryId: id });

        // Safe file delete
        try {
            fs.unlinkSync(category.image);
        } catch (err) {
            console.log("Image file not found, skipping delete");
        }
        
        await catagoryModel.findByIdAndDelete(id);
        
        req.flash("success","Product Deleted Successfully..✅")
        return res.redirect("/addProduct");
    } catch (err) {
        console.log("Error deleting category:", err);
        return res.status(500).send("Server Error");
    }
};

//-8 delete subcategory controller
module.exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await subCatagoryModel.findById(id);

        await extraCatagoryModel.deleteMany({ subCategoryId: id });

        // Safe file delete
        try {
            fs.unlinkSync(subCategory.image);
        } catch (err) {
            console.log("Image file not found, skipping delete");
        }

        await subCatagoryModel.findByIdAndDelete(id);

        res.redirect("/addProduct");
    } catch (err) {
        console.log("Error deleting subcategory:", err);
        res.status(500).send("Server Error");
    }
};

//-9 delete extra category controller
module.exports.deleteExtraCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const extraCategory = await extraCatagoryModel.findById(id);

        // Safe file delete
        try {
            fs.unlinkSync(extraCategory.image);
        } catch (err) {
            console.log("Image file not found, skipping delete");
        }

        await extraCatagoryModel.findByIdAndDelete(id);

        res.redirect("/addProduct");
    } catch (err) {
        console.log("Error deleting extra category:", err);
        res.status(500).send("Server Error");
    }
};

//-10 open register page
module.exports.openRegisterPage = async (req, res) => {
    return res.render("pages/registerForm.ejs");
};

// signup controller
module.exports.submitSignup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userinDatabase = await User.findOne({ email: email });
        if (userinDatabase) {
            return res.redirect("/registerForm");
        }
        await User.create({ username, email, password });
        console.log("User signed up successfully");

        return res.redirect('/loginForm');
    } catch (err) {
        console.log(err);
        res.send("Error in submitting signup");
    }
}


//-11 open login page
module.exports.openLoginPage = async (req, res) => {
    return res.render("pages/loginForm.ejs");
};


//-12 logout page
module.exports.logout = (req, res) => {
    req.logOut(() => {
        req.flash("success", "Logout successfully..✅");
        return res.redirect("/loginForm");
    })
}
