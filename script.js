document.addEventListener("DOMContentLoaded", function () {
    const xmlUrl = "https://cors-anywhere.herokuapp.com/https://www.mylaptime.com/laptime/clientes/2079124170P7C8606B4X50483/livetime.xml";
    const xpathExpression = "/KARTODROMOS/PROVA/POSICOES";

    // Função para buscar o XML e processá-lo
    async function fetchAndDisplayData() {
        try {
            const response = await fetch(xmlUrl);
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            // Aplica o XPath
            const positions = xmlDoc.evaluate(
                xpathExpression,
                xmlDoc,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );

            const tableBody = document.querySelector("#data-table tbody");
            tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

            // Loop nos nós de resultado
            for (let i = 0; i < positions.snapshotLength; i++) {
                const positionNode = positions.snapshotItem(i);

                // Extrai dados para Posição e Nome
                const posicao = positionNode.querySelector("POS")?.textContent || "N/A";
                const nome = positionNode.querySelector("NOME")?.textContent || "N/A";

                // Adiciona uma linha na tabela
                addRowToTable(posicao, nome);
            }
        } catch (error) {
            console.error("Erro ao buscar e processar o XML:", error);
        }
    }

    // Função para adicionar uma linha na tabela HTML
    function addRowToTable(posicao, nome) {
        const tableBody = document.querySelector("#data-table tbody");
        const row = document.createElement("tr");

        const posCell = document.createElement("td");
        posCell.textContent = posicao;
        row.appendChild(posCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = nome;
        row.appendChild(nameCell);

        tableBody.appendChild(row);
    }

    // Executa a função de busca e exibição de dados
    fetchAndDisplayData();

    // Atualiza a cada 5 segundos
    setInterval(fetchAndDisplayData, 5000);
});
