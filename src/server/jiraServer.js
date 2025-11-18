import express from "express";
import jira from "./routes/jira.js";

const app = express();

app.use("/jira-dashboard", jira);

app.listen(3000, () => console.log("API rodando na porta 3000"));
