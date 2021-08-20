const express = require("express");

const Router = express.Router();

const homeController = require("../controllers/home");

Router.get("/",homeController.getHome);

Router.get("/chains",homeController.getChains);

Router.get("/createBlockchain",homeController.getCreateBlockchain);

Router.get("/mineBlock/:blockchainIndex",homeController.getMineBlock);

module.exports = Router;