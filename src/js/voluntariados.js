const DB_NAME = "VoluntariadoDB";
const DB_VERSION = 2;
let db = null;

function abrirBDVoluntariados() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = function (event) {
      const database = event.target.result;

      if (!database.objectStoreNames.contains("voluntariados")) {
        const store = database.createObjectStore("voluntariados", {
          keyPath: "id",
          autoIncrement: true
        });

        store.createIndex("titulo", "titulo", { unique: false });
      }
    };

    req.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };

    req.onerror = function (event) {
      console.error("Error al abrir IndexedDB:", event);
      reject(event);
    };
  });
}

function addVoluntariado() {
  const titulo = document.getElementById('titulo').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const fecha = document.getElementById('fecha').value;
  const descripcion = document.getElementById('descripcion').value.trim();
  const tipo = document.getElementById('tipo').value;

  const alerta = document.getElementById('alertaErrores');
  alerta.classList.add('d-none');
  alerta.innerHTML = "";

  let errores = [];

  if (!titulo) errores.push("<li>El campo Título es obligatorio.</li>");
  if (!usuario) errores.push("<li>El campo Usuario es obligatorio.</li>");
  if (!fecha) errores.push("<li>El campo Fecha es obligatorio.</li>");
  if (!descripcion) errores.push("<li>El campo Descripción es obligatorio.</li>");
  if (!tipo) errores.push("<li>Debes seleccionar un Tipo de voluntariado.</li>");

  if (errores.length > 0) {
    alerta.innerHTML = "Errores:<ul>" + errores.join('') + "</ul>";
    alerta.classList.remove('d-none');
    alerta.classList.add('error-con-icono');
    return;
  }

  const nuevoVoluntariado = {
    titulo,
    usuario,
    fecha,
    descripcion,
    tipo
  };

  const tx = db.transaction("voluntariados", "readwrite");
  const store = tx.objectStore("voluntariados");

  store.add(nuevoVoluntariado);

  tx.oncomplete = () => {
    mostrarDatosVoluntariados();
    document.getElementById("alta").reset();
  };
}

function eliminarVoluntariado(id) {
  const tx = db.transaction("voluntariados", "readwrite");
  const store = tx.objectStore("voluntariados");

  store.delete(id);

  tx.oncomplete = () => {
    mostrarDatosVoluntariados();
  };
}

function obtenerVoluntariadosBD() {
  return new Promise((resolve) => {
    const tx = db.transaction("voluntariados", "readonly");
    const store = tx.objectStore("voluntariados");

    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve([]);
  });
}

async function mostrarDatosVoluntariados() {
  const cuerpo = document.querySelector('#consultaVoluntariados');
  cuerpo.innerHTML = "";

  const lista = await obtenerVoluntariadosBD();

  let delay = 0;

  lista.forEach(v => {
    const fila = `
      <tr class="fade-in-right" style="--d:${delay}ms">
        <td>${v.titulo}</td>
        <td>${v.usuario}</td>
        <td>${v.fecha}</td>
        <td>${v.descripcion}</td>
        <td>${v.tipo}</td>
        <td>
          <button class="btn btn-primary bg-custom-blue w-100"
                  onclick="eliminarVoluntariado(${v.id})">
            Borrar
          </button>
        </td>
      </tr>
    `;
    cuerpo.innerHTML += fila;
    delay += 100;
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  await abrirBDVoluntariados();
  mostrarDatosVoluntariados();
});

window.addVoluntariado = addVoluntariado;
window.mostrarDatosVoluntariados = mostrarDatosVoluntariados;
window.eliminarVoluntariado = eliminarVoluntariado;