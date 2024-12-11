      // Obtén el nombre de la página actual
      const paginaActual = window.location.pathname.split("/").pop();

      // Intenta obtener el contador actual para esta página desde localStorage
      let contador = localStorage.getItem(`visitas_${paginaActual}`);

      // Si no existe, inicializa en 0
      if (!contador) {
          contador = 0;
      }

      // Incrementa el contador
      contador = parseInt(contador) + 1;

      // Guarda el nuevo valor en localStorage
      localStorage.setItem(`visitas_${paginaActual}`, contador);

      // Muestra el contador junto al icono
      document.getElementById("contador").innerText = contador;
