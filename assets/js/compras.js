const productos = [
  { id: 1, nombre: "Software logistica 1", precio: 100, categoria: "inventario", imagen: "assets/img/Inventario.jpg" },
  { id: 2, nombre: "Prestamo 1", precio: 150, categoria: "financiero", imagen: "assets/img/financiero.jpg" },
  { id: 3, nombre: "Curso 1", precio: 200, categoria: "educativo", imagen: "assets/img/educacion.jpg" },
  { id: 4, nombre: "Campaña 1", precio: 200, categoria: "marketing", imagen: "assets/img/marketing.jpg" },
  { id: 5, nombre: "Software logistica 2", precio: 110, categoria: "inventario", imagen: "assets/img/Inventario.jpg" },
  { id: 6, nombre: "financimiento", precio: 160, categoria: "financiero", imagen: "assets/img/financiero.jpg" },
  { id: 7, nombre: "Curso 2", precio: 210, categoria: "educativo", imagen: "assets/img/educacion.jpg" },
  { id: 8, nombre: "Campaña 2", precio: 210, categoria: "marketing", imagen: "assets/img/marketing.jpg" },
  { id: 9, nombre: "Software logistica 3", precio: 120, categoria: "inventario", imagen: "assets/img/Inventario.jpg" },
  { id: 10, nombre: "asesoria", precio: 170, categoria: "financiero", imagen: "assets/img/financiero.jpg" },
  { id: 11, nombre: "Curso 3", precio: 220, categoria: "educativo", imagen: "assets/img/educacion.jpg" },
  { id: 12, nombre: "Campaña 3", precio: 220, categoria: "marketing", imagen: "assets/img/marketing.jpg" },
  { id: 13, nombre: "Software logistica 4", precio: 130, categoria: "inventario", imagen: "assets/img/Inventario.jpg" },
  { id: 14, nombre: "abrir cuenta", precio: 180, categoria: "financiero", imagen: "assets/img/financiero.jpg" },
  { id: 15, nombre: "Curso 4", precio: 230, categoria: "educativo", imagen: "assets/img/educacion.jpg" },
  { id: 16, nombre: "Campaña 4", precio: 230, categoria: "marketing", imagen: "assets/img/marketing.jpg" }
];

let carrito = [];

// Referencias del DOM
const cardsContainer = document.querySelector(".cards");
const carritoDOM = document.getElementById("carrito");
const totalDOM = document.getElementById("total");
const botonVaciar = document.getElementById("boton-vaciar");
const cartCounter = document.getElementById("cart-counter");
const cartCountersmall = document.getElementById("cart-counter-small");
const filtros = document.querySelectorAll(".form-check-input"); // Checkboxes para filtrar

// Función para cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
    actualizarContadorCarrito();
  }
}

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Renderizar productos con opción de filtrado
function renderizarProductos(listaProductos = productos) {
  cardsContainer.innerHTML = "";

  listaProductos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card", "p-2","border-0");

    card.innerHTML = `
      <div class="card p-2 h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button class="btn btn-primary" data-id="${producto.id}">Agregar</button>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);
  });

  document.querySelectorAll(".btn-primary").forEach((boton) =>
    boton.addEventListener("click", agregarProducto)
  );
}

// Filtrar productos según categorías seleccionadas
function filtrarProductos() {
  const categoriasSeleccionadas = Array.from(filtros)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const productosFiltrados = categoriasSeleccionadas.length > 0
    ? productos.filter(producto => categoriasSeleccionadas.includes(producto.categoria))
    : productos;

  renderizarProductos(productosFiltrados);
}

// Agregar evento de cambio a los checkboxes
filtros.forEach(checkbox => {
  checkbox.addEventListener("change", filtrarProductos);
});

// Funciones del carrito (sin cambios significativos)
function agregarProducto(event) {
  const idProducto = parseInt(event.target.dataset.id);
  const producto = productos.find((prod) => prod.id === idProducto);
  const productoExistente = carrito.find((prod) => prod.id === idProducto);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarritoEnLocalStorage();
  actualizarCarrito();
  actualizarContadorCarrito();
}

function actualizarCarrito() {
  carritoDOM.innerHTML = "";

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center");

    li.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail" style="width: 50px; margin-right: 10px;" />
        <div>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</div>
      </div>
      <button class="btn btn-danger btn-sm ms-auto" data-index="${index}"><i class="bi bi-trash-fill"></i></button>
    `;
    carritoDOM.appendChild(li);

    li.querySelector(".btn-danger").addEventListener("click", eliminarProducto);
  });

  const total = carrito.reduce((sum, prod) => sum + prod.precio * prod.cantidad, 0);
  totalDOM.textContent = total;
}

function eliminarProducto(event) {
  const index = parseInt(event.target.dataset.index);

  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  } else {
    carrito.splice(index, 1);
  }

  guardarCarritoEnLocalStorage();
  actualizarCarrito();
  actualizarContadorCarrito();
}

botonVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
  actualizarContadorCarrito();
});

function actualizarContadorCarrito() {
  const totalProductos = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
  cartCounter.textContent = totalProductos;
  cartCountersmall.textContent = totalProductos;
}

// Cargar el carrito y renderizar productos al inicio
cargarCarritoDesdeLocalStorage();
renderizarProductos();
