const express = require("express");
const router = express.Router();
const WmsController = require("../controllers/WmsController");
const UsersController = require("../controllers/UsersController");
const PricesController = require("../controllers/PricesController");
const checkLogin = require("../middleware/checkLogin");
router.get("/", WmsController.showHome);

router.get("/admin/racks/index", checkLogin("usuario"), WmsController.showRacks);
router.get("/admin/racks/new", checkLogin("usuario"), WmsController.createRack);
router.post("/admin/racks/save", WmsController.saveRack);
router.get("/admin/racks/edit/:id", checkLogin("usuario"), WmsController.editRack);
router.post("/admin/racks/update", WmsController.updateRack);
router.post("/admin/racks/delete", WmsController.deleteRack);
router.get("/admin/racks/select-racks-inversion", checkLogin("usuario"), WmsController.selectRacksInversion);
router.post("/admin/racks/confirm-racks-inversion", WmsController.confirmRacksInversion);

router.get("/admin/users/index", checkLogin("adm"), UsersController.showUsers);
router.get("/admin/users/new", checkLogin("adm"), UsersController.createUser);
router.post("/admin/users/save", UsersController.saveUser);
router.post("/admin/users/delete", UsersController.deleteUser);
router.get("/admin/users/login", UsersController.loginUser);
router.post("/admin/authenticatelogin", UsersController.authenticateLogin);
router.post("/admin/users/select-theme", UsersController.selectTheme);

router.get("/admin/prices/index", checkLogin("usuario"), PricesController.showPrices);
router.get("/admin/prices/new", checkLogin("adm"), PricesController.createPrice);
router.post("/admin/prices/save", PricesController.savePrice);
router.get("/admin/prices/edit/:id", checkLogin("adm"), PricesController.editPrice);
router.post("/admin/prices/update", PricesController.updatePrice);
router.post("/admin/prices/delete", PricesController.deletePrice);

module.exports = router;