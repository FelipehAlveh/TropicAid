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