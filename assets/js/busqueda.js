function scrollToSearch(event) {
  event.preventDefault(); // Evitar recargar la página

  const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();

  if (searchTerm) {
    // Buscar todos los elementos relevantes en el contenido de la página
    const elements = document.querySelectorAll("body *:not(script):not(style):not(form):not(nav)");

    let bestMatch = null;
    let highestSimilarity = 0;

    elements.forEach((element) => {
      const textContent = element.textContent.trim().toLowerCase();

      if (textContent.includes(searchTerm)) {
        // Calcular similitud: porcentaje de coincidencia con la búsqueda
        const similarity = calculateSimilarity(searchTerm, textContent);

        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestMatch = element;
        }
      }
    });

    if (bestMatch) {
      // Desplazarse al mejor elemento encontrado
      bestMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      bestMatch.style.backgroundColor = "yellow"; // Resaltar el elemento
      setTimeout(() => (bestMatch.style.backgroundColor = ""), 2000); // Eliminar resaltado después de 2 segundos
    } else {
      alert("No se encontró el texto buscado.");
    }
  } else {
    alert("Por favor, introduce una palabra para buscar.");
  }
}

// Función para calcular la similitud entre dos cadenas
function calculateSimilarity(searchTerm, textContent) {
  const searchWords = searchTerm.split(" ");
  const contentWords = textContent.split(" ");

  let matches = 0;
  searchWords.forEach((word) => {
    if (contentWords.includes(word)) {
      matches++;
    }
  });

  // Retornar porcentaje de palabras coincidentes
  return (matches / searchWords.length) * 100;
}
