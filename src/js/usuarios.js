function addUsuario(){
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const alerta = document.getElementById('alertaErrores');

    alerta.classList.add('d-none');
    alerta.classList.remove('error-con-icono');
    alerta.innerHTML = '';

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let errores = [];

    if (nombre.length === 0) {
        errores.push('<li>El campo Nombre es obligatorio.</li>');
    }
    
    if (email.length === 0) {
        errores.push('<li>El campo Email es obligatorio.</li>');
    } else if (!esEmailValido(email)) {
        errores.push('<li>El formato del Email no es correcto.</li>');
    }
    
    if (password.length === 0) {
        errores.push('<li>El campo Password es obligatorio.</li>');
    } else if (!esPasswordValido(password)) { 
        errores.push('<li>La Contraseña debe ser alfanumérica y tener exactamente 8 caracteres.</li>');
    }

    if (errores.length > 0) {
        alerta.innerHTML = 'Error al registrar:<ul>' + errores.join('') + '</ul>';
        
        alerta.classList.add('error-con-icono'); 
        alerta.classList.remove('d-none'); 
        return;
    }

    alerta.classList.remove('error-con-icono'); 
    alerta.classList.add('d-none');

    const nuevo_usuario = {
        nombre,
        email,
        password
    }
    usuarios.push(nuevo_usuario);
    mostrarDatosUsuarios();

    const formulario = document.getElementById('altaUsuario');
    formulario.reset();
}

function eliminarUsuario(indice){
    usuarios.splice(indice, 1);   
    mostrarDatosUsuarios();
}

function mostrarDatosUsuarios(){
    const form_usuarios = document.querySelector('#consulta')

    form_usuarios.innerHTML = '';
        
    let delay = 0;
    for(let i = 0; i < usuarios.length; i++){
        
        const fila =`
            <tr class="fade-in-right" style="--d:${delay}ms">
                <td>${usuarios[i].nombre}</td>        
                <td>${usuarios[i].email}</td>       
                <td>${usuarios[i].password}</td>
                <td>
                    <button type="button" class="btn btn-primary bg-custom-blue w-100" onclick='eliminarUsuario(${i})'>Borrar</button>
                </td>
            </tr> 
        `;
        delay += 100;
        form_usuarios.innerHTML += fila;
    }
}
