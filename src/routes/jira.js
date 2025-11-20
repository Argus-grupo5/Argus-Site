const express = require("express");
const { getResumoJira } = require("../controllers/jiraController.js");

const router = express.Router();

router.get("/resumo", getResumoJira);

module.exports = router;
