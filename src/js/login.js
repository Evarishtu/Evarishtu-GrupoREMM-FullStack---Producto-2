function mostrarUsuarioActivo(){
    const usuario_activo = localStorage.getItem('usuarioActivo');
    const campo_usuario_activo = document.getElementById('usuario-logueado');

    if(campo_usuario_activo){
        if(usuario_activo){
            campo_usuario_activo.innerHTML = `${usuario_activo}`;
        }
    }else{
        campo_usuario_activo.textContent = '';
    }
}

function checkUsuario(){
    const emailInput = document.getElementById('id');
    const passwordInput = document.getElementById('pass');
    const alerta = document.getElementById('alertaErrores');

    alerta.classList.add('d-none', 'alert-danger'); 
    alerta.classList.remove('alert-success', 'error-con-icono'); 
    alerta.innerHTML = '';

    const usuario = emailInput.value.trim();
    const password = passwordInput.value;

    let errores = [];

    if (usuario.length === 0) {
        errores.push('<li>El campo Email es obligatorio.</li>');
    } else if (!esEmailValido(usuario)) {
        errores.push('<li>El formato del Email no es correcto.</li>');
    }
    
    if (password.length === 0) {
        errores.push('<li>El campo Contraseña es obligatorio.</li>');
    } else if (!esPasswordValido(password)) { 
        errores.push('<li>La Contraseña debe ser alfanumérica y tener exactamente 8 caracteres.</li>');
    }
    
    if (errores.length > 0) {
        alerta.innerHTML = 'Error de validación:<ul>' + errores.join('') + '</ul>';

        alerta.classList.add('error-con-icono'); 
        alerta.classList.remove('d-none'); 
        return;
    }

    alerta.classList.remove('error-con-icono'); 
    alerta.classList.add('d-none');

    let encontrado = false;
    let sesion_exitosa = false;
    let usuario_nombre = '';

    for (let i = 0; i < usuarios.length; i++){
        if (usuario === usuarios[i].email){
            encontrado = true;
            usuario_nombre = usuarios[i].nombre;
            if(password === usuarios[i].password){
                sesion_exitosa = true;
            }
            break;
        }
    }
    if (sesion_exitosa) {

        localStorage.setItem('usuarioActivo', usuario_nombre);
        mostrarUsuarioActivo(); 

        alerta.classList.remove('alert-danger', 'error-con-icono', 'd-none');
        alerta.classList.add('alert-success'); 
        alerta.innerHTML = `¡Sesión iniciada correctamente!<br>Bienvenid@, ${usuario_nombre}.`;
        
    } else {
        alerta.classList.add('alert-danger', 'error-con-icono'); 
        alerta.classList.remove('d-none');
        
        if (!encontrado) {
            alerta.innerHTML = '<ul><li>El usuario no existe.</li></ul>';
        } else {
            alerta.innerHTML = '<ul><li>Contraseña incorrecta.</li></ul>';
        }
        
        passwordInput.value = '';
    }
}