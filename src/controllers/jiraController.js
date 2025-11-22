const email_jira = "luiz.hsouza@sptech.school";
const token_jira = "ATATT3xFfGF08peCbzHDW7NphdJZSbDE73t0jK9txkqai4zucwrE2PQFfmpkoD-GbPoZKzxrFYk51KYdU4IqErcyxUOpBVTP7-JNY56aOmW2ugAKchMZ_47RFtaj5M6JAGPi64A5aQjbJzsQAe5DauvRlZ-zOHVdVhPiEftcuwCEAQR3EHCafgk=D75C1533";
const dominio_jira = "sptech-team-cppjq4lc.atlassian.net";
const auth = Buffer.from(`${email_jira}:${token_jira}`).toString("base64");

async function getResumoJira(req, res) {
  try {
    const url = `https://${dominio_jira}/rest/api/3/search/jql`;
    const resposta = await fetch( url,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jql: "project = AA",
          maxResults: 125,
          fields: ["summary", "assignee", "priority", "status",  "created", "resolutiondate"]
        })
      });

      if (!resposta.ok) {
      throw new Error(`Erro na API do Jira: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    res.status(200).json(dados);
  } catch (erro) {
    console.error("Erro ao buscar chamados do Jira:", erro);
    res.status(500).json({ error: "Erro ao buscar chamados do Jira" });
  }
}
module.exports = {
  getResumoJira
};