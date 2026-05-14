function template() {
    localStorage.clear();
    localStorage.setItem('usuario','BRASIL00');
    localStorage.setItem('senha','23432');
    localStorage.setItem('recursototal','2000000');
    localStorage.setItem('recursoalocado','900000');
    localStorage.setItem('recursopicls','300000');
    localStorage.setItem('historico','[{"nome":"Investimento 1","valor":900000,"desc":"Descrição do Investimento 1"},{"nome":"Investimento 2","valor":300000,"desc":"Qualquer descrição que ajude a identificar seus investimentos!"}]')
}

function realizarLogin() {
     const cadastro = document.getElementById('cadastro').value;
     const senha = document.getElementById('senha').value;


const usuarioSalvo = localStorage.getItem('usuario');
const senhaSalva = localStorage.getItem('senha');

if (cadastro === usuarioSalvo && senha === senhaSalva) {
    alert('Login realizado com sucesso!');
    window.location.href = "principal.html";
} else {
    alert('Usuário ou senha incorretos.');
}
}
function exibirdados() {
    const recursototal = localStorage.getItem('recursototal') || 0;
    const recursoalocado = localStorage.getItem('recursoalocado') || 0;
    const recursopicls = localStorage.getItem('recursopicls') || 0;

let totalString = localStorage.getItem('recursototal');
let alocadoString = localStorage.getItem('recursoalocado');
let piclsString = localStorage.getItem('recursopicls');

let total = Number(totalString) || 0;
let alocado = Number(alocadoString) || 0;
let picls = Number(piclsString) || 0;

let naoAlocado = total - alocado - picls;
localStorage.setItem('recursonaoalocado',naoAlocado)
const recursonaoalocado = localStorage.getItem('recursonaoalocado');

let porcentPicls = total > 0 ? (picls / total) * 100 : 0;
localStorage.setItem('porcentPicls', porcentPicls.toFixed(2));
const metaPiclsAtingida = porcentPicls >= 20 ? "Sim" : "Não";
localStorage.setItem('metaPiclsAtingida', metaPiclsAtingida);

    if (recursototal) {
        document.getElementById('recursototal').textContent = recursototal;
    }
    if (recursoalocado) {
        document.getElementById('recursoalocado').textContent = recursoalocado;
    }
    if (recursonaoalocado) {
        document.getElementById('recursonaoalocado').textContent = recursonaoalocado;
    }
    if (recursopicls) {
        document.getElementById('recursopicls').textContent = recursopicls;
    }
    if (metaPiclsAtingida) {
        document.getElementById('metaPiclsAtingida').textContent = metaPiclsAtingida;
    }
    if (porcentPicls) {
        document.getElementById('porcentPicls').textContent = ` (${porcentPicls.toFixed(2)}%)`;
}
gerarGrafico(alocado, naoAlocado, picls);
carregarHistorico();
}
function carregarHistorico() {
    const listaElemento = document.getElementById('listaDespesas');
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    if (listaElemento) {
        listaElemento.innerHTML = ""; 

        historico.forEach(item => {
            const li = document.createElement('li');
            
            // ESTILOS CRÍTICOS: Isso trava o texto dentro do azul
            li.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
            li.style.padding = "5px 0";
            li.style.listStyle = "none";
            li.style.width = "100%"; 
            li.style.display = "block"; 
            
            const valorReal = Number(item.valor).toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            });
            
            
            li.innerHTML = `
                <div style="color: white; font-size: 0.9em;">
                    <span style="font-weight: bold;">${item.nome}</span>: ${valorReal}
                </div>
                <div style="color: rgba(255,255,255,0.7); font-size: 0.8em; font-style: italic; margin-left: 5px;">
                    ${item.desc || "Sem descrição"}
                </div>
            `;
            listaElemento.appendChild(li);
        });
    }
}

function salvarDespesa() {
    const nome = document.getElementById('nome').value;
    const valor = Number(document.getElementById('money').value);
    const descricao = document.getElementById('desc').value; 
    const ehPICLs = document.getElementById('PICLs').checked;

    if (nome && valor > 0) {
        
        if (ehPICLs) {
            let piclsAtual = Number(localStorage.getItem('recursopicls')) || 0;
            localStorage.setItem('recursopicls', piclsAtual + valor);
        } else {
            let alocadoAtual = Number(localStorage.getItem('recursoalocado')) || 0;
            localStorage.setItem('recursoalocado', alocadoAtual + valor);
        }

        
        let historico = JSON.parse(localStorage.getItem('historico')) || [];
        historico.push({ 
            nome: nome, 
            valor: valor, 
            desc: descricao 
        });
        localStorage.setItem('historico', JSON.stringify(historico));

        window.location.href = "principal.html";
    } else {
        alert("Preencha o nome e um valor válido!");
    }
}

function gerarGrafico(recursoalocado, recursonaoalocado, recursopicls) {
    const ctx = document.getElementById('meuGrafico').getContext('2d');
    
    new Chart(ctx, {
        type: 'pie', // Gráfico de fatias
        data: {
            labels: ['Recurso Alocado', 'Recurso Não Alocado', 'Recurso em Picls'], // Rótulos para cada fatia
            datasets: [{
                data: [recursoalocado, recursonaoalocado, recursopicls], // Dados vindos do LocalStorage
                backgroundColor: [
                    '#4eb86d', // Verde para Alocado
                    '#6e6e6e',  // Cinza para Não Alocado
                    '#ffcc5c'  // Amarelo para Picls
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    color: '#ffffff',
                    font: {
                        family: 'Titillium Web',
                        weight: 'bolder',
                        size: 14
                    },
                    text: 'Distribuição de Recursos'
                }
            }
        }
    });
}

window.onload = exibirdados;