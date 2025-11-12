function addVoluntariado(){
    const tituloInput = document.getElementById('titulo');
    const usuarioInput = document.getElementById('usuario');
    const fechaInput = document.getElementById('fecha');
    const descripcionInput = document.getElementById('descripcion');
    const tipoInput = document.getElementById('tipo');

    const alerta = document.getElementById('alertaErrores');

    alerta.classList.add('d-none');
    alerta.classList.remove('error-con-icono');
    alerta.innerHTML = '';

    const titulo = tituloInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const fecha = fechaInput.value; 
    const descripcion = descripcionInput.value.trim();
    const tipo = tipoInput.value;

    let errores = [];

    if (titulo.length === 0) {
        errores.push('<li>El campo Título es obligatorio.</li>');
    }
    if (usuario.length === 0) {
        errores.push('<li>El campo Usuario es obligatorio.</li>');
    }
    if (fecha.length === 0) {
        errores.push('<li>El campo Fecha es obligatorio.</li>');
    }
    if (descripcion.length === 0) {
        errores.push('<li>El campo Descripción es obligatorio.</li>');
    }
    if (tipo === "" || tipo === null) { 
        errores.push('<li>Debes seleccionar un Tipo de voluntariado.</li>');
    }

    if (errores.length > 0) {
        alerta.innerHTML = 'Error al registrar:<ul>' + errores.join('') + '</ul>';
        alerta.classList.add('error-con-icono'); 
        alerta.classList.remove('d-none'); 
        return;
    }

    alerta.classList.remove('error-con-icono'); 
    alerta.classList.add('d-none');

    const nuevo_voluntariado = {
        titulo: titulo,
        usuario: usuario,
        fecha: fecha,
        descripcion: descripcion,
        tipo: tipo
    }
    voluntariados.push(nuevo_voluntariado);
    mostrarDatosVoluntariados();

    const formulario = document.getElementById('alta');
    formulario.reset();
}

function eliminarVoluntariado(indice){
    voluntariados.splice(indice, 1);   
    mostrarDatosVoluntariados();
}

function mostrarDatosVoluntariados(){
    const form_voluntariados = document.querySelector('#consultaVoluntariados')

    form_voluntariados.innerHTML = '';
        
    let delay = 0;
    for(let i = 0; i < voluntariados.length; i++){
        
        const fila =`
            <tr class="fade-in-right" style="--d:${delay}ms">
                <td>${voluntariados[i].titulo}</td>        
                <td>${voluntariados[i].usuario}</td>       
                <td>${voluntariados[i].fecha}</td>      
                <td>${voluntariados[i].descripcion}</td>      
                <td>${voluntariados[i].tipo}</td>
            
                <td>
                    <button type="button" class="btn btn-primary bg-custom-blue w-100" onclick='eliminarVoluntariado(${i})'>Borrar</button>
                </td>
            </tr> 
        `;
        delay += 100;
        form_voluntariados.innerHTML += fila;
    }
}