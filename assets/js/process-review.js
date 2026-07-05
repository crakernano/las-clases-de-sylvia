// async function cargarYRecorrer() {
//   try {
//     const respuesta = await fetch('../assets/data/review.json'); // Ruta a tu archivo
//     const datos = await respuesta.json();        // Convierte automáticamente a array

//     datos.reviews.forEach(review => {
//       console.log("Autor:", review.authorAttribution.displayName);
//     });
//   } catch (error) {
//     console.error('Error al cargar el JSON:', error);
//   }
// }

async function cargarYRenderizarReseñas() {
  try {
    const respuesta = await fetch('../assets/data/review.json'); // Asegúrate de que la ruta es correcta
    const datos = await respuesta.json();
    
    // 1. Seleccionamos el contenedor del HTML
    const contenedor = document.getElementById('reviwe-container');
    
    // 2. Limpiamos el contenedor por si tiene contenido de prueba previo
    contenedor.innerHTML = '';

    // 3. Recorremos el array de reseñas
    datos.reviews.forEach(review => {
      // Creamos la estructura HTML exacta reemplazando las variables
      const tarjetaHTML = `
        <article class="card-article swiper-slide">
          <div class="card-body">
            <p>“${review.text.text}”</p>
            <div class="card-shadow"></div>
            <div class="card-footer">
              <div class="row">
                <div class="col-3">
                  <img
                    src="${review.authorAttribution.photoUri}"
                    alt="${review.authorAttribution.displayName}"
                    class="card-avatar"
                  />
                </div>
                <div class="col-9">
                  <span class="card-name">${review.authorAttribution.displayName}</span>
                  <span class="card-role">${review.relativePublishTimeDescription}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;

      // 4. Inyectamos la tarjeta en el contenedor
      contenedor.innerHTML += tarjetaHTML;
    });

    // 5. ¡IMPORTANTE! Si usas Swiper, debes reinicializarlo o actualizarlo aquí
    // Ejemplo: miSwiper.update(); 

  } catch (error) {
    console.error('Error cargando o renderizando las reseñas:', error);
  }
}

// Ejecutamos la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarYRenderizarReseñas);
