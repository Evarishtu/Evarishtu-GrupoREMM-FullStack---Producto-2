const form_voluntariados = document.getElementById('alta');
if (form_voluntariados) {
  form_voluntariados.addEventListener('submit', function (evento) {
    evento.preventDefault();
    addVoluntariado();
    form_voluntariados.reset();
  });
}

const form_login = document.getElementById('login');
if (form_login) {
  form_login.addEventListener('submit', function (evento) {
    evento.preventDefault();
    checkUsuario();
  });
}

const form_usuarios = document.getElementById('altaUsuario');
if (form_usuarios) {
  form_usuarios.addEventListener('submit', function (evento) {
    evento.preventDefault();
    addUsuario();
  });
}


function addFlipCardListener() {
  const tarjetas = document.querySelectorAll('.flip-card-inner');

  tarjetas.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });
}


window.addFlipCardListener = addFlipCardListener;