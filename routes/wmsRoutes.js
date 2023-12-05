const express = require("express");
const router = express.Router();
const WmsController = require("../controllers/WmsController");
const UsersController = require("../controllers/UsersController");
const PricesController = require("../controllers/PricesController");
const checkLogin = require("../middleware/checkLogin");
router.get("/", WmsController.showHome);

router.get("/admin/racks/index", checkLogin("usuario"), WmsController.showRacks);
router.get("/admin/racks/new", checkLogin("usuario"), WmsController.registerNewRack);
router.post("/admin/racks/save", WmsController.saveNewRack);
router.get("/admin/racks/edit/:id", checkLogin("usuario"), WmsController.editRack);
router.post("/admin/racks/update", WmsController.updateRack);
router.post("/admin/racks/delete", WmsController.deleteRack);
router.get("/admin/racks/select-racks-inversion", checkLogin("usuario"), WmsController.selectRacksInversion);
router.post("/admin/racks/confirm-racks-inversion", WmsController.confirmRacksInversion);

router.get("/admin/users/index", checkLogin("adm"), UsersController.showUsers);
router.get("/admin/users/create", checkLogin("adm"), UsersController.createUsers);
router.post("/admin/users/save", UsersController.saveUsers);
router.post("/admin/users/delete", UsersController.deleteUser);
router.get("/admin/users/login", UsersController.loginUsers);
router.post("/admin/authenticatelogin", UsersController.authenticateLogin);
router.post("/admin/users/select-theme", UsersController.selectTheme);

router.get("/admin/prices/index", checkLogin("usuario"), PricesController.showPrices);
router.get("/admin/prices/new", checkLogin("adm"), PricesController.createPrices);
router.post("/admin/prices/save", PricesController.savePrices);
router.post("/admin/prices/delete", PricesController.deletePrice);

module.exports = router;