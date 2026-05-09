function template() {
    localStorage.clear();
    localStorage.setItem('usuario','BRASIL00');
    localStorage.setItem('senha','23432');
    localStorage.setItem('recursototal','35000');
    localStorage.setItem('recursoalocado','12000')
    localStorage.setItem('recursopicls','3000');
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

gerarGrafico(alocado, naoAlocado, picls);
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