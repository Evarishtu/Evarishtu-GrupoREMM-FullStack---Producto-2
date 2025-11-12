function mostrarDashboard() {
    const data_ofertas = document.querySelector('#ofertas');
    data_ofertas.innerHTML = '';
    
    for (let i = 0; i < voluntariados.length; i++) {
        const item = voluntariados[i];

        const typeClass = item.tipo === 'peticion' ? 'bg-dark-type text-white' : 'bg-light-type';
        const textClass = item.tipo === 'peticion' ? 'text-white' : 'text-white';

        const fila = `
            <div class="col mb-3 fade-in-bottom">
                <div class="flip-card">
                    <div class="flip-card-inner" data-id="${i}">
                        <div class="card p-3 card-front ${typeClass}">
                            <h5 class="card-title-lg ${textClass}">${item.titulo}</h5>
                            <p class="card-subtitle-sm mb-2 ${textClass}">${item.fecha}</p>
                            <p class="card-text-desc ${textClass}">${item.descripcion}</p>
                            <small class="card-subtitle mt-auto ${textClass}"><strong>Publicado por:</strong> <br> ${item.usuario}</small>
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
    }
}