function mostrarUsuarioActivo() {
  const usuario_activo = obtenerUsuarioActivo();
  const campo = document.getElementById('usuario-logueado');

  if (!campo) return;

  if (usuario_activo) {
    campo.textContent = usuario_activo;
  } else {
    campo.textContent = '-no login-';
  }
}

function checkUsuario() {
  const emailInput = document.getElementById('id');
  const passwordInput = document.getElementById('pass');
  const alerta = document.getElementById('alertaErrores');

  // Reset alerta
  alerta.classList.add('d-none');
  alerta.innerHTML = '';

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let errores = [];

  if (!email) {
    errores.push('<li>El campo Email es obligatorio.</li>');
  } else if (!esEmailValido(email)) {
    errores.push('<li>El formato del Email no es correcto.</li>');
  }

  if (!password) {
    errores.push('<li>El campo Contraseña es obligatorio.</li>');
  } else if (!esPasswordValido(password)) {
    errores.push('<li>La contraseña debe tener exactamente 8 caracteres alfanuméricos.</li>');
  }

  if (errores.length > 0) {
    alerta.innerHTML = 'Errores:<ul>' + errores.join('') + '</ul>';
    alerta.classList.remove('d-none');
    return;
  }

  const listaUsuarios = obtenerUsuarios();
  let encontrado = null;

  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i].email === email) {
      encontrado = listaUsuarios[i];
      break;
    }
  }

  if (!encontrado) {
    alerta.innerHTML = '<ul><li>El usuario no existe.</li></ul>';
    alerta.classList.remove('d-none');
    passwordInput.value = '';
    return;
  }

  if (encontrado.password !== password) {
    alerta.innerHTML = '<ul><li>Contraseña incorrecta.</li></ul>';
    alerta.classList.remove('d-none');
    passwordInput.value = '';
    return;
  }

  guardarUsuarioActivo(encontrado.nombre);
  mostrarUsuarioActivo();

  alerta.classList.remove('d-none');
  alerta.classList.remove('alert-danger');
  alerta.classList.add('alert-success');
  alerta.innerHTML = `¡Sesión iniciada correctamente!<br>Bienvenid@, ${encontrado.nombre}.`;
}

document.addEventListener('DOMContentLoaded', function () {
  mostrarUsuarioActivo();
});