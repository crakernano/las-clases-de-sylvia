let swiperCard = new Swiper(".card-content", {
  loop: true,
  spaceBetween: 30,
  grabCursor: true,
  speed: 1500,
  autoplay:{
    delay: 10,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    600: { slidesPerView: 2 },
    968: { slidesPerView: 4 },
  },
});

// Gestión de selección de imágenes: por defecto B/N, al hacer click la imagen queda en color
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.custom-img-item');
  function clearActive() {
    items.forEach(i => i.classList.remove('active'));
  }

  items.forEach(item => {
    item.addEventListener('click', function (e) {
      // marcar sólo el elemento clicado como activo
      clearActive();
      item.classList.add('active');
      // dejar que el atributo onclick del HTML (si existe) maneje el cambio de texto
    });
  });
});

// Forzar eliminación de scroll interno en Swiper (sobre-escribe estilos inline que Swiper pueda aplicar)
document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.card-container .swiper-wrapper');
  const container = document.querySelector('.card-container');
  if (wrapper) {
    wrapper.style.overflow = 'visible';
    wrapper.style.height = 'auto';
    wrapper.style.maxHeight = 'none';
    wrapper.style.scrollSnapType = 'none';
    // ocultar scrollbar visualmente como redundancia
    wrapper.style.scrollbarWidth = 'none';
  }
  if (container) {
    container.style.overflow = 'visible';
    container.style.height = 'auto';
  }
});