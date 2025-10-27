/* usuariosu.js
   Lógica de autenticación con nombre completo
*/

const usuarios = [
  { nombreCompleto: "Joel Phele Rojas", usuario: "joel", password: "73111584" },
  { nombreCompleto: "Jose Cjuno Rojas", usuario: "josecjuno", password: "12345678" },
   { nombreCompleto: "Alumno de Prueba", usuario: "admin", password: "12345678" },
  { nombreCompleto: "Pablo Quispe Laura", usuario: "pabloql", password: "87654321" }
];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');
  const msgBox = document.getElementById('msg');
  const togglePwd = document.getElementById('togglePwd');

  // Mostrar/ocultar contraseña
  togglePwd.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    togglePwd.textContent = passwordInput.type === 'password' ? '👁️' : '🙈';
  });

  // Mostrar mensajes dinámicos
  function showMessage(text, type = 'error') {
    msgBox.textContent = text;
    msgBox.className = 'message ' + (type === 'error' ? 'error' : 'success');
    msgBox.style.display = 'block';
  }

  // Manejo del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!usuario) {
      showMessage('Por favor, ingrese su usuario.', 'error');
      usuarioInput.focus();
      return;
    }
    if (!password) {
      showMessage('Por favor, ingrese su contraseña.', 'error');
      passwordInput.focus();
      return;
    }

    const encontrado = usuarios.find(u => u.usuario.toLowerCase() === usuario);

    if (!encontrado) {
      showMessage('Usuario incorrecto.', 'error');
      return;
    }

    if (encontrado.password !== password) {
      showMessage('Contraseña incorrecta.', 'error');
      return;
    }

    // Guardar nombre completo en el almacenamiento local
    localStorage.setItem('usuarioActivo', encontrado.nombreCompleto);

    // Éxito
    showMessage(`Bienvenido, ${encontrado.nombreCompleto}!`, 'success');

    setTimeout(() => {
      window.location.href = 'bienvenido.html';
    }, 800);
  });
});

