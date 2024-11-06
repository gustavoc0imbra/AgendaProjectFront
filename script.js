const baseUrl = "http://localhost:8082/api";
const btnAgendas = document.getElementById("btnAgendas");
const btnClientes = document.getElementById("btnClientes");
const btnFuncionarios = document.getElementById("btnFuncionarios");
const btnServicos = document.getElementById("btnServicos");

btnAgendas.addEventListener("click", () => {
    const bodyTabelaAgenda = document.getElementById("bodyTabelaAgenda");
    bodyTabelaAgenda.innerHTML = "";

    fetch(`${baseUrl}/agendas`)
        .then((resp) => {
            const result = resp.json();
            let p = "";
            result.then((result) => {
                result.forEach((agenda) => {
                    p += `<tr>
                            <th>${agenda.id}</th>
                            <td>${agenda.descricao}</td>
                            <td>${new Date(agenda.data).toLocaleString("pt-BR")}</td>
                            <td>${agenda.funcionario.nome}</td>
                            <td>${agenda.cliente.nome}</td>
                            <td>${agenda.servico.nome}</td>
                            <td class="text-end">R$ ${agenda.servico.valor}</td>
                          </tr>`;

                    bodyTabelaAgenda.innerHTML = p;
                });
            })

            
        })
        .catch((err) => {
            console.error("Erro ao chamar api: " + err)
        })
});

btnClientes.addEventListener("click", () => {

});

btnFuncionarios.addEventListener("click", () => {

});

btnServicos.addEventListener("click", () => {

});