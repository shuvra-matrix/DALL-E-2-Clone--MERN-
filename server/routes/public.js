const express = require("express");
const publicController = require("../controller/public");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", publicController.getApi);
router.post(
  "/api/v1/dalle",
  check("query").isString().withMessage("Invalid Input"),
  check("name").isString().withMessage("Invaid Input"),
  publicController.dalleAPI
);
router.get("/api/v1/get/community", publicController.getCommunityData);

router.post("/api/v1/dalle/community", publicController.sendCommunity);

router.post("/api/v1/post/community", publicController.getCommunityDataByQuery);

module.exports = router;
