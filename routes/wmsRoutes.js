const express = require("express");
const router = express.Router();
const WmsController = require("../controllers/WmsController");

router.get("/", WmsController.showHome);

router.get("/admin/racks/index", WmsController.showRacks);
router.get("/admin/racks/new", WmsController.registerNewRack);
router.post("/admin/racks/save", WmsController.saveNewRack);
router.get("/admin/racks/edit/:id", WmsController.editRack);
router.post("/admin/racks/update", WmsController.updateRack);
router.post("/admin/racks/delete", WmsController.deleteRack);
router.get("/admin/racks/select-racks-inversion", WmsController.selectRacksInversion);
router.post("/admin/racks/confirm-racks-inversion", WmsController.confirmRacksInversion);

module.exports = router;