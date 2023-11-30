const express = require("express");
const router = express.Router();
const WmsController = require("../controllers/WmsController");
const checkLogin = require("../middleware/checkLogin");
router.get("/", WmsController.showHome);

router.get("/admin/racks/index", checkLogin, WmsController.showRacks);
router.get("/admin/racks/new", checkLogin, WmsController.registerNewRack);
router.post("/admin/racks/save", WmsController.saveNewRack);
router.get("/admin/racks/edit/:id", checkLogin, WmsController.editRack);
router.post("/admin/racks/update", WmsController.updateRack);
router.post("/admin/racks/delete", WmsController.deleteRack);
router.get("/admin/racks/select-racks-inversion", checkLogin, WmsController.selectRacksInversion);
router.post("/admin/racks/confirm-racks-inversion", WmsController.confirmRacksInversion);

router.get("/admin/users/create", checkLogin, WmsController.createUsers);
router.post("/admin/users/save", WmsController.saveUsers);
router.get("/admin/users/login", WmsController.loginUsers);
router.post("/admin/authenticatelogin", WmsController.authenticateLogin);

module.exports = router;