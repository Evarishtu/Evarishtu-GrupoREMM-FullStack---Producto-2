const DB_NAME = "VoluntariadoDB";
const DB_VERSION = 2;
let db = null;


function abrirBD() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (event) {
        const database = event.target.result;

        if (database.objectStoreNames.contains("voluntariados")) {
            database.deleteObjectStore("voluntariados");
        }

        const store = database.createObjectStore("voluntariados", {
            keyPath: "id",
            autoIncrement: true
        });

        store.createIndex("titulo", "titulo", { unique: false });
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      console.error("Error al abrir IndexedDB:", event);
      reject(event);
    };
  });
}


function voluntariadosExisten() {
  return new Promise((resolve) => {
    const tx = db.transaction("voluntariados", "readonly");
    const store = tx.objectStore("voluntariados");

    const countReq = store.count();

    countReq.onsuccess = () => resolve(countReq.result > 0);
    countReq.onerror = () => resolve(false);
  });
}


function guardarVoluntariadosIniciales() {
  return new Promise((resolve) => {
    const tx = db.transaction("voluntariados", "readwrite");
    const store = tx.objectStore("voluntariados");

    window.voluntariados.forEach(v => store.add(v));

    tx.oncomplete = () => resolve(true);
  });
}

function obtenerVoluntariados() {
  return new Promise((resolve) => {
    const tx = db.transaction("voluntariados", "readonly");
    const store = tx.objectStore("voluntariados");

    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve([]);
  });
}

function mostrarUsuarioActivoDashboard() {
  const nombre = obtenerUsuarioActivo();
  const campo = document.getElementById("usuario-logueado");

  if (campo) {
    campo.textContent = nombre || "-no login-";
  }
}

function mostrarDashboard(voluntariadosList) {
  const data_ofertas = document.querySelector('#ofertas');
  data_ofertas.innerHTML = '';

  voluntariadosList.forEach((item, i) => {
    const typeClass = item.tipo === 'peticion' ? 'bg-dark-type text-white' : 'bg-light-type';
    const textClass = 'text-white';

    const fila = `
      <div class="col mb-3 fade-in-bottom">
        <div class="flip-card">
          <div class="flip-card-inner" data-id="${i}">
            <div class="card p-3 card-front ${typeClass}">
              <h5 class="card-title-lg ${textClass}">${item.titulo}</h5>
              <p class="card-subtitle-sm mb-2 ${textClass}">${item.fecha}</p>
              <p class="card-text-desc ${textClass}">${item.descripcion}</p>
              <small class="card-subtitle mt-auto ${textClass}">
                <strong>Publicado por:</strong><br> ${item.usuario}
              </small>
            </div>

            <div class="card p-3 card-back image-back-styled ${typeClass}">
              <div class="back-image-container">
                <img src="${item.imagenFondo}" alt="${item.titulo}" class="img-fluid back-image-centered">
              </div>
              <div class="back-info-text-group mt-auto ${textClass}">
                <h5>GRUPO REMM</h5>
                <p class="mb-0">Des. full stack de sol. web JavaScript y serv. web</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    data_ofertas.innerHTML += fila;
  });

  addFlipCardListener();
}


document.addEventListener('DOMContentLoaded', async function () {

  mostrarUsuarioActivoDashboard();

  await abrirBD();

  const existen = await voluntariadosExisten();

  if (!existen) {
    await guardarVoluntariadosIniciales();
  }

  const lista = await obtenerVoluntariados();

  mostrarDashboard(lista);
});