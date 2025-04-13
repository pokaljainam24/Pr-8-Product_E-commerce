const { Router } = require("express");
const Mainrouter = Router();

const adminRouter = require("./ecommerceAdminRoutes");
Mainrouter.use(adminRouter);

const clientRotes = require("./clientRoutes");
Mainrouter.use(clientRotes);

module.exports = Mainrouter;
