const express = require("express");
const publicController = require("../controller/public");

const router = express.Router();

router.get("/", publicController.getApi);
router.post("/api/v1/dalle", publicController.dalleAPI);

module.exports = router;
