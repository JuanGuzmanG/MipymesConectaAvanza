// Datos de productos
const productos = [
    { id: 1, nombre: "Software logistica 1", precio: 100, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
    { id: 2, nombre: "Prestamo 1", precio: 150, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
    { id: 3, nombre: "Curso 1", precio: 200, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
    { id: 4, nombre: "Campaña 1", precio: 200, categoria: "marketing", imagen: "assets/img/marketplace.jpg" },
    { id: 5, nombre: "Software logistica 2", precio: 110, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
    { id: 6, nombre: "Prestamo 2", precio: 160, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
    { id: 7, nombre: "Curso 2", precio: 210, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
    { id: 8, nombre: "Campaña 2", precio: 210, categoria: "marketing", imagen: "assets/img/marketplace.jpg" },
    { id: 9, nombre: "Software logistica 3", precio: 120, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
    { id: 10, nombre: "Prestamo 3", precio: 170, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
    { id: 11, nombre: "Curso 3", precio: 220, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
    { id: 12, nombre: "Campaña 3", precio: 220, categoria: "marketing", imagen: "assets/img/marketplace.jpg" },
    { id: 13, nombre: "Software logistica 4", precio: 130, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
    { id: 14, nombre: "Prestamo 4", precio: 180, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
    { id: 15, nombre: "Curso 4", precio: 230, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
    { id: 16, nombre: "Campaña 4", precio: 230, categoria: "marketing", imagen: "assets/img/marketplace.jpg" }
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