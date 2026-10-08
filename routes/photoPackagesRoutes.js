const express = require("express");
const router = express.Router();

const photoPackageController = require("../controllers/photoPackageController");
const cekApiKey = require("../middlewares/cekApiKey");

// GET semua paket foto
router.get("/", photoPackageController.getAll);

// GET paket foto berdasarkan ID
router.get("/:id", photoPackageController.getById);

// POST tambah paket foto
router.post("/", cekApiKey, photoPackageController.create);

// PUT ubah paket foto
router.put("/:id", cekApiKey, photoPackageController.update);

// DELETE paket foto
router.delete("/:id", cekApiKey, photoPackageController.remove);

module.exports = router;