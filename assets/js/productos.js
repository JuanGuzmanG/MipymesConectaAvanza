// Datos de productos
const productos = [
    { id: 1, nombre: "empresa construccion 1", precio: 100, categoria: "construccion", imagen: "assets/img/construccion.jpg" },
    { id: 2, nombre: "empresa ropa 1", precio: 150, categoria: "ropa", imagen: "assets/img/ropa.jpg" },
    { id: 3, nombre: "empresa comida 1", precio: 200, categoria: "comida", imagen: "assets/img/comida.jpg" },
    { id: 4, nombre: "empresa miniMarket 1", precio: 200, categoria: "minimarket", imagen: "assets/img/minimarket.jpg" },
    { id: 5, nombre: "empresa construccion 2", precio: 110, categoria: "construccion", imagen: "assets/img/construccion.jpg" },
    { id: 6, nombre: "empresa ropa 2", precio: 160, categoria: "ropa", imagen: "assets/img/ropa.jpg" },
    { id: 7, nombre: "empresa comida 2", precio: 210, categoria: "comida", imagen: "assets/img/comida.jpg" },
    { id: 8, nombre: "empresa miniMarket 2", precio: 210, categoria: "minimarket", imagen: "assets/img/minimarket.jpg" },
    { id: 9, nombre: "empresa construccion 3", precio: 120, categoria: "construccion", imagen: "assets/img/construccion.jpg" },
    { id: 10, nombre: "empresa ropa 3", precio: 170, categoria: "ropa", imagen: "assets/img/ropa.jpg" },
    { id: 11, nombre: "empresa comida 3", precio: 220, categoria: "comida", imagen: "assets/img/comida.jpg" },
    { id: 12, nombre: "empresa miniMarket 3", precio: 220, categoria: "minimarket", imagen: "assets/img/minimarket.jpg" },
    { id: 13, nombre: "empresa construccion 4", precio: 130, categoria: "construccion", imagen: "assets/img/construccion.jpg" },
    { id: 14, nombre: "empresa ropa 4", precio: 180, categoria: "ropa", imagen: "assets/img/ropa.jpg" },
    { id: 15, nombre: "empresa comida 4", precio: 230, categoria: "comida", imagen: "assets/img/comida.jpg" },
    { id: 16, nombre: "empresa miniMarket 4", precio: 230, categoria: "minimarket", imagen: "assets/img/minimarket.jpg" }
  ];
  
  // Referencia del contenedor de las tarjetas y los filtros
  const cardsContainer = document.querySelector(".cards");
  const filtros = document.querySelectorAll(".form-check-input"); // Checkboxes para filtrar
  
  // Función para renderizar productos
  function renderizarProductos(listaProductos = productos) {
    cardsContainer.innerHTML = ""; // Limpia el contenedor
  
    listaProductos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("col");
  
      card.innerHTML = `
        <div class="card p-2">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
          </div>
        </div>
      `;
  
      cardsContainer.appendChild(card);
    });
  }
  
  // Función para filtrar productos
  function filtrarProductos() {
    const categoriasSeleccionadas = Array.from(filtros)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  
    const productosFiltrados = categoriasSeleccionadas.length > 0
      ? productos.filter(producto => categoriasSeleccionadas.includes(producto.categoria))
      : productos;
  
    renderizarProductos(productosFiltrados);
  }
  
  // Agregar eventos a los checkboxes
  filtros.forEach(checkbox => {
    checkbox.addEventListener("change", filtrarProductos);
  });
  
  // Renderizar productos al inicio
  renderizarProductos();