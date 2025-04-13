const { Router } = require("express");
const AdminController = require('../controllers/adminController');
const router = Router();
const upload = require('../middleware/imageUploads');
const passport = require("../middleware/passport-local");
const userAuth = require('../middleware/userAuth');

router.get('/registerForm', AdminController.openRegisterPage);
router.post('/registerForm', AdminController.submitSignup);

router.get('/loginForm', AdminController.openLoginPage);

router.post('/loginForm', passport.authenticate("local", {
    failureRedirect: "/loginForm",
    failureFlash: "Login Failed"
}), AdminController.loginSuccess);

// // Auth-protected routes
router.use(userAuth);

router.get('/', AdminController.openDashBoardPage);
router.get('/addProduct', AdminController.openAddProductPage);
router.post('/addProduct', upload, AdminController.addCategory);
router.post('/addSubCategory', upload, AdminController.addSubCategory);
router.post('/addExtraCategory', upload, AdminController.addExtraCategory);
router.get('/viewProducts', AdminController.viewAllCategories);
router.get('/category/delete/:id', AdminController.deleteCategory);
router.get('/subcategory/delete/:id', AdminController.deleteSubCategory);
router.get('/extracategory/delete/:id', AdminController.deleteExtraCategory);

router.get("/logout", AdminController.logout);

module.exports = router;
