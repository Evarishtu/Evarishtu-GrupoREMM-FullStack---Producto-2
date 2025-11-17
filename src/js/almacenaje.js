const CLAVE_USUARIOS = 'usuarios';
const CLAVE_USUARIO_ACTIVO = 'usuarioActivo';

/**
 * Inicializa los usuarios en localStorage SOLO si:
 * - No existe aún la clave "usuarios"
 * - Y existe el array global "usuarios" definido en data.js
 */
function inicializarUsuariosSiVacio() {
  try {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);

    if (!guardados && Array.isArray(window.usuarios)) {
      localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(window.usuarios));
    }
  } catch (error) {
    console.error('Error al inicializar usuarios en localStorage:', error);
  }
}

function obtenerUsuarios() {
  try {
    const data = localStorage.getItem(CLAVE_USUARIOS);
    if (!data) {
      return [];
    }
    const lista = JSON.parse(data);
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    console.error('Error al leer usuarios de localStorage:', error);
    return [];
  }
}

function guardarUsuarios(lista) {
  try {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
  } catch (error) {
    console.error('Error al guardar usuarios en localStorage:', error);
  }
}

function crearUsuario(usuario) {
  const lista = obtenerUsuarios();
  lista.push(usuario);
  guardarUsuarios(lista);
}

function borrarUsuarioPorIndice(indice) {
  const lista = obtenerUsuarios();
  if (indice >= 0 && indice < lista.length) {
    lista.splice(indice, 1);
    guardarUsuarios(lista);
  }
}

function borrarUsuarioPorEmail(email) {
  const lista = obtenerUsuarios();
  const filtrados = lista.filter(function (u) {
    return u.email !== email;
  });
  guardarUsuarios(filtrados);
}

function existeEmailUsuario(email) {
  const lista = obtenerUsuarios();
  return lista.some(function (u) {
    return u.email === email;
  });
}

function guardarUsuarioActivo(nombre) {
  try {
    localStorage.setItem(CLAVE_USUARIO_ACTIVO, nombre);
  } catch (error) {
    console.error('Error al guardar el usuario activo:', error);
  }
}

function obtenerUsuarioActivo() {
  try {
    return localStorage.getItem(CLAVE_USUARIO_ACTIVO);
  } catch (error) {
    console.error('Error al obtener el usuario activo:', error);
    return null;
  }
}

function limpiarUsuarioActivo() {
  try {
    localStorage.removeItem(CLAVE_USUARIO_ACTIVO);
  } catch (error) {
    console.error('Error al limpiar el usuario activo:', error);
  }
}

/**
 * Autentica un usuario verificando las credenciales contra la lista almacenada.
 * Cumple con el requisito de encapsular la lógica de autenticación en el módulo de persistencia.
 * @param {string} email - Email proporcionado por el usuario.
 * @param {string} password - Contraseña proporcionada por el usuario.
 * @returns {Object|null} El objeto de usuario encontrado y logueado, o null si falla.
 */
function loguearUsuario(email, password) {
    const listaUsuarios = obtenerUsuarios();
    let encontrado = null;

    // Buscar al usuario por email
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].email === email) {
            encontrado = listaUsuarios[i];
            break;
        }
    }

    if (!encontrado) {
        return null; // El usuario no existe
    }

    // Verificar la contraseña
    if (encontrado.password !== password) {
        return null; // Contraseña incorrecta
    }

    // Si es exitoso, guardar el nombre del usuario activo
    guardarUsuarioActivo(encontrado.nombre); 

    return encontrado; // Retorna el objeto de usuario
}

document.addEventListener('DOMContentLoaded', function () {
  inicializarUsuariosSiVacio();
});