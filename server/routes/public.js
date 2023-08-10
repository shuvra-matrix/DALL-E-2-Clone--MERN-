const express = require("express");
const publicController = require("../controller/public");

const router = express.Router();

router.get("/", publicController.getApi);
router.post("/api/v1/dalle", publicController.dalleAPI);
router.get("/api/v1/get", publicController.getImage);

module.exports = router;
