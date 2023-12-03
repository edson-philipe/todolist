const express = require("express");
const router = express.Router();
const WmsController = require("../controllers/WmsController");
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

router.get("/admin/users/create", checkLogin("adm"), WmsController.createUsers);
router.post("/admin/users/save", WmsController.saveUsers);
router.get("/admin/users/login", WmsController.loginUsers);
router.post("/admin/authenticatelogin", WmsController.authenticateLogin);
router.post("/admin/users/select-theme", WmsController.selectTheme);

module.exports = router;