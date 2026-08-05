// Adjust slidesPerView so it never exceeds the actual number of slides
const _cardSlides = Math.max(1, document.querySelectorAll('.card-content .swiper-slide').length);
const _spDefault = Math.min(2, _cardSlides);
const _sp600 = Math.min(2, _cardSlides);
const _sp968 = Math.min(6, _cardSlides);

// Swiper configuration
const _speed = 1500;
const _requestedAutoplayDelay = 10; // user's preferred tiny delay
const _autoplayDelay = _requestedAutoplayDelay < _speed ? _speed + 50 : _requestedAutoplayDelay;

let swiperCard = null;

function getTestimonialsSwiperConfig(slidesCount) {
  const safeSlidesCount = Math.max(1, slidesCount);
  return {
    default: Math.min(2, safeSlidesCount),
    medium: Math.min(2, safeSlidesCount),
    large: Math.min(6, safeSlidesCount),
  };
}

function initTestimonialsSwiper() {
  const slides = document.querySelectorAll('.card-content .swiper-slide');
  const wrapper = document.querySelector('.card-content .swiper-wrapper');

  if (!wrapper || slides.length === 0) {
    return;
  }

  if (swiperCard) {
    swiperCard.destroy(true, true);
    swiperCard = null;
  }

  const config = getTestimonialsSwiperConfig(slides.length);

  swiperCard = new Swiper('.card-content', {
    slidesPerView: config.default,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: false,
    loopedSlides: slides.length,
    grabCursor: true,
    speed: _speed,
    autoplay: {
      delay: _autoplayDelay,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      600: { slidesPerView: config.medium },
      968: { slidesPerView: config.large },
    },
  });
}

window.initTestimonialsSwiper = initTestimonialsSwiper;

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