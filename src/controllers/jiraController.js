const axios = require("axios");

async function getResumoJira(req, res) {
    try {
        const email = process.env.JIRA_EMAIL;
        const token = process.env.JIRA_TOKEN;

        const auth = Buffer.from(`${email}:${token}`).toString('base64');

        const resposta = await axios.post(
            "https://sptech-team-cppjq4lc.atlassian.net/rest/api/3/search/jql",
            {
                jql: "project = AA",
                maxResults: 50
            },
            {
                headers: {
                    "Authorization": `Basic ${auth}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        const issues = resposta.data.issues;

        const abertas = issues.filter(i => i.fields.status.name !== "Done").length;
        const fechadas = issues.filter(i => i.fields.status.name === "Done").length;

        const prioridade = {
            high: issues.filter(i => i.fields.priority?.name === "High").length,
            medium: issues.filter(i => i.fields.priority?.name === "Medium").length,
            low: issues.filter(i => i.fields.priority?.name === "Low").length
        };

        const total = issues.length;

        res.json({
            total,
            abertas,
            fechadas,
            prioridades: prioridade
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ erro: "Falha ao consultar Jira" });
    }
}
module.exports = { getResumoJira };