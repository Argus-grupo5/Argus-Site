const express = require("express");
const router = express.Router();
const jiraController = require("../controllers/jiraController");

router.get("/getResumoJira", jiraController.getResumoJira);

module.exports = router;
