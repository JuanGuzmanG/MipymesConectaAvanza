const productos = [
    { id: 1, nombre: "marketplace", description: "conoce sus productos",imagen: "assets/img/marketplace.jpg"},
    { id: 2, nombre: "gestion de inventarios", description: "sistemas inventarios",imagen: "assets/img/Inventario.jpg"},
    { id: 3, nombre: "gestion financiera", description: "Prestamos y Asesorias",imagen: "assets/img/financiero.jpg"},
    { id: 4, nombre: "educacion", description: "Cursos y diplomados",imagen: "assets/img/educacion.jpg"},
    { id: 4, nombre: "marketing digital", description: "contenido en la web",imagen: "assets/img/marketing.jpg"},
];
  
  let carrito = [];
  
  // Contenedor de las tarjetas
  const cardsContainer = document.querySelector(".cards");
  
  // Renderizar productos (puede recibir un conjunto filtrado de productos)
  function renderizarProductos(listaProductos = productos) {
    cardsContainer.innerHTML = ""; // Limpiar el contenedor
  
    listaProductos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col");
  
        card.innerHTML = `
        <div class="card h-100 d-flex flex-column">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body flex-grow-1">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.description}</p>
            </div>
            <div class="card-footer mt-auto">
                <button class="btn btn-primary w-100" data-id="${producto.id}">
                    <a href="compras.html" style="text-decoration: none; color: white;">Comprar</a>
                </button>
            </div>
        </div>
        `;
  
        cardsContainer.appendChild(card);
    });
  }
  
  // Renderizar todos los productos al cargar la página
  renderizarProductos();
  