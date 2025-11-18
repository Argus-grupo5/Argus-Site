import express from "express";
import { getResumoJira } from "./jiraController.js";

const router = express.Router();

router.get("/resumo", getResumoJira);

export default router;
