const baseUrl = "http://localhost:8082/api";
const btnAgendas = document.getElementById("btnAgendas");
const btnClientes = document.getElementById("btnClientes");
const btnFuncionarios = document.getElementById("btnFuncionarios");
const btnServicos = document.getElementById("btnServicos");
const modal = document.getElementById("modal");
const agendaGroup = document.getElementById("agendaGroup");
const clienteGroup = document.getElementById("clienteGroup");
const funcionarioGroup = document.getElementById("funcionarioGroup");
const servicoGroup = document.getElementById("servicoGroup");


btnAgendas.addEventListener("click", () => {
    exibeTabela([agendaGroup]);
    removeTabela([clienteGroup, funcionarioGroup, servicoGroup]);

    const bodyTabelaAgenda = document.getElementById("bodyTabelaAgenda");
    bodyTabelaAgenda.innerHTML = "";
    
    const resultTotal = document.getElementById("totalGeral");
    const resultRealizado = document.getElementById("totalRealizado");
    const resultNaoRealizado = document.getElementById("totalNaoRealizado");

    modal.showModal();
    
    fetch(`${baseUrl}/agendas`)
        .then((resp) => {
            const result = resp.json();
            let p = "";
            let somaTotal = 0;
            let somaRealizado = 0;
            let somaNaoRealizado = 0;

            result.then((result) => {
                result.forEach((agenda) => {
                    
                    if(agenda.status) {
                        somaRealizado += agenda.servico.valor;
                    }else{
                        somaNaoRealizado += agenda.servico.valor;
                    }

                    somaTotal += agenda.servico.valor;
                    
                    p += `<tr>
                            <th>${agenda.id}</th>
                            <td>${agenda.descricao}</td>
                            <td>${new Date(agenda.data).toLocaleString("pt-BR").toString().substring(0, 17)}</td>
                            <td>${agenda.funcionario.nome}</td>
                            <td>${agenda.cliente.nome}</td>
                            <td>${agenda.servico.nome.substring(0, 20)}</td>
                            <td class="${agenda.status ? 'text-success' : 'text-danger'}">${agenda.status ? 'Realizado' : 'Não Realizado'}</td>
                            <td class="text-end">R$ ${agenda.servico.valor.toFixed(2)}</td>
                          </tr>`;
                    
                });
                resultRealizado.innerHTML = "Realizado: R$ " + somaRealizado.toFixed(2);
                resultNaoRealizado.innerHTML = "Não Realizado: R$ " + somaNaoRealizado.toFixed(2);
                resultTotal.innerHTML = "Total Geral: R$ " + somaTotal.toFixed(2);
                bodyTabelaAgenda.innerHTML = p;
            })

           
        })
        .catch((err) => {
            console.error("Erro ao chamar api: " + err)
        }).finally(() => {
            modal.close();
        })
});

btnClientes.addEventListener("click", () => {
    exibeTabela([clienteGroup]);
    removeTabela([agendaGroup, funcionarioGroup, servicoGroup]);

    const bodyTabelaCliente = document.getElementById("bodyTabelaCliente");
    bodyTabelaCliente.innerHTML = "";
    
    const qtdeTotal = document.getElementById("totalQtdeCliente");

    modal.showModal();
    
    fetch(`${baseUrl}/clientes`)
        .then((resp) => {
            const result = resp.json();
            let p = "";
            let contador = 0;

            result.then((result) => {
                result.forEach((cliente) => {
                
                    p += `<tr>
                            <th>${cliente.id}</th>
                            <td>${cliente.nome}</td>
                            <td>${cliente.telefone}</td>
                            <td>${cliente.email}</td>
                          </tr>`;

                    contador += 1;
                });
                
                qtdeTotal.innerHTML = `Qtde. Cliente(s): ${contador}`;
                bodyTabelaCliente.innerHTML = p;
            })
            .catch((err) => {
                console.error("erro ao transformar em json: ", err);
            });
           
        })
        .catch((err) => {
            console.error("Erro ao chamar api: " + err)
        }).finally(() => {
            modal.close();
        })
});

btnFuncionarios.addEventListener("click", () => {
    exibeTabela([funcionarioGroup]);
    removeTabela([agendaGroup, clienteGroup, servicoGroup]);

    const bodyTabelaFuncionario = document.getElementById("bodyTabelaFuncionario");
    bodyTabelaFuncionario.innerHTML = "";
    
    const qtdeTotal = document.getElementById("totalQtdeFuncionario");

    modal.showModal();
    
    fetch(`${baseUrl}/funcionarios`)
        .then((resp) => {
            const result = resp.json();
            let p = "";
            let contador = 0;

            result.then((result) => {
                result.forEach((funcionario) => {
                
                    p += `<tr>
                            <th>${funcionario.id}</th>
                            <td>${funcionario.nome}</td>
                            <td>${funcionario.telefone}</td>
                            <td>${funcionario.email}</td>
                            <td>R$ ${parseFloat(funcionario.salario).toFixed(2)}</td>
                          </tr>`;

                    contador += 1;
                });
                
                qtdeTotal.innerHTML = `Qtde. Funcionário(s): ${contador}`;
                bodyTabelaFuncionario.innerHTML = p;
            })
            .catch((err) => {
                console.error("erro ao transformar em json: ", err);
            });
           
        })
        .catch((err) => {
            console.error("Erro ao chamar api: " + err)
        }).finally(() => {
            modal.close();
        })
});

btnServicos.addEventListener("click", () => {
    exibeTabela([servicoGroup]);
    removeTabela([agendaGroup, clienteGroup, funcionarioGroup]);

    const bodyTabelaServicos = document.getElementById("bodyTabelaServico");
    bodyTabelaServicos.innerHTML = "";
    
    const qtdeTotal = document.getElementById("totalQtdeServico");

    modal.showModal();
    
    fetch(`${baseUrl}/servicos`)
        .then((resp) => {
            const result = resp.json();
            let p = "";
            let contador = 0;

            result.then((result) => {
                result.forEach((servico) => {
                
                    p += `<tr>
                            <th>${servico.id}</th>
                            <td>${servico.nome}</td>
                            <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                          </tr>`;

                    contador += 1;
                });
                
                qtdeTotal.innerHTML = `Qtde. Serviço(s): ${contador}`;
                bodyTabelaServicos.innerHTML = p;
            })
            .catch((err) => {
                console.error("erro ao transformar em json: ", err);
            });
           
        })
        .catch((err) => {
            console.error("Erro ao chamar api: " + err)
        }).finally(() => {
            modal.close();
        })
});

function exibeTabela(tabelas) {
    tabelas.forEach((tabela) => {
        tabela.classList.remove("d-none");
    })
}

function removeTabela(tabelas) {
    tabelas.forEach((tabela) => {
        tabela.classList.add("d-none");
    })
}