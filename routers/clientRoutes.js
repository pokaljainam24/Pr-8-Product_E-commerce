const { Router } = require("express");
const clientRotes = Router();
const clienController = require('../controllers/clientController')

clientRotes.use("/home", clienController.openClientHomepage);

// Category route
clientRotes.get('/category/:id', clienController.openCategoryPage);

// Subcategory route
clientRotes.get('/subcategory/:id', clienController.openSubCategoryPage);

// Extra Category route
clientRotes.get('/extracategory/:id', clienController.openExtraCategoryPage);

module.exports = clientRotes;