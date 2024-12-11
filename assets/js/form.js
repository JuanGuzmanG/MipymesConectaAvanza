document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Verifica si el formulario es válido
    if (!this.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Agrega clases de Bootstrap para mostrar los mensajes de error
    this.classList.add('was-validated');
  });