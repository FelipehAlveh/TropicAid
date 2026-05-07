function template() {
    localStorage.clear;
    localStorage.setItem('usuario','BRASIL00');
    localStorage.setItem('senha','23432');
    localStorage.setItem('recursototal','35000');
    localStorage.setItem('recursoalocado','12000');
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
    const recursototal = localStorage.getItem('recursototal');
    const recursoalocado = localStorage.getItem('recursoalocado');

let totalString = localStorage.getItem('recursototal');
let alocadoString = localStorage.getItem('recursoalocado');

let total = Number(totalString) || 0;
let alocado = Number(alocadoString) || 0;

let naoalocado = total - alocado;
localStorage.setItem('recursonaoalocado',naoalocado)

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
}
window.onload = exibirdados;