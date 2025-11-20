import express from "express";
import cors from "cors";   
import dotenv from "dotenv";
import jira from "./routes/jira.js";

dotenv.config({ path: "../.env.dev" });


console.log("JIRA_EMAIL:", process.env.JIRA_EMAIL);
console.log("JIRA_TOKEN:", process.env.JIRA_TOKEN);

const app = express();

app.use(cors()); 
app.use("/jira-dashboard", jira);

app.listen(3333, () => console.log("API rodando na porta 3333"));
