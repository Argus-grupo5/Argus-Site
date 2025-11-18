import axios from "axios";

export async function getResumoJira(req, res) {
    try {
        const email = process.env.JIRA_EMAIL;
        const token = process.env.JIRA_TOKEN;

        const auth = Buffer.from(`${email}:${token}`).toString('base64');

        const resposta = await axios.get(
            "https://sua-org.atlassian.net/rest/api/3/search?jql=project=SUPORTE",
            {
                headers: {
                    "Authorization": `Basic ${auth}`,
                    "Accept": "application/json"
                }
            }
        );

        const issues = resposta.data.issues;

        // Processamento para a dashboard
        const aberto = issues.filter(i => i.fields.status.name !== "Done").length;
        const fechado = issues.filter(i => i.fields.status.name === "Done").length;

        const prioridade = {
            high: issues.filter(i => i.fields.priority?.name === "High").length,
            medium: issues.filter(i => i.fields.priority?.name === "Medium").length,
            low: issues.filter(i => i.fields.priority?.name === "Low").length
        };

        res.json({
            abertos: aberto,
            fechados: fechado,
            prioridades: prioridade
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ erro: "Falha ao consultar Jira" });
    }
}
