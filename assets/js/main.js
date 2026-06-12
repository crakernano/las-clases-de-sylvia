// main.js - punto de entrada JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar AOS (centralizado aquí)
  if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
    try {
      AOS.init({ once: true, offset: 40, duration: 600, easing: 'ease-out-cubic', anchorPlacement: 'top-bottom' });
    } catch (e) { console.warn('Error inicializando AOS:', e); }
  } else {
    console.warn('AOS no disponible en main.js (se inicializará si se carga después)');
  }

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function setActive(link) {
    navLinks.forEach(l => l.classList.remove('active'));
    if (link) link.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href') || '';

      // Si es un ancla interna, prevenimos el comportamiento por defecto
      // y hacemos un scroll suave hasta el elemento objetivo.
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          setActive(this);

          const headerOffset = 0; // ajustar si se usa un header fijo
          const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

          // Manejo especial si el menú offcanvas está abierto: cerrarlo primero
          const offcanvasEl = document.getElementById('mainNav');
          if (offcanvasEl && typeof bootstrap !== 'undefined') {
            const instance = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
            if (offcanvasEl.classList.contains('show')) {
              // Espera al evento de cierre para hacer el scroll (evita overflow:hidden)
              const onceHidden = function () {
                offcanvasEl.removeEventListener('hidden.bs.offcanvas', onceHidden);
                try {
                  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                } catch (err) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                if (history && typeof history.pushState === 'function') {
                  history.pushState(null, '', href);
                } else {
                  location.hash = href;
                }
                setTimeout(onScroll, 700);
              };
              offcanvasEl.addEventListener('hidden.bs.offcanvas', onceHidden);
              instance.hide();
              return;
            }
          }

          // Si no hay offcanvas abierto, scrollea inmediatamente
          try {
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
          } catch (err) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }

          // Si tras 200ms la ventana sigue en top 0, intentamos detectar un contenedor scrollable
          setTimeout(() => {
            if ((window.pageYOffset || document.documentElement.scrollTop) === 0) {
              const findScrollContainer = (el) => {
                let cur = el.parentElement;
                while (cur) {
                  const style = getComputedStyle(cur);
                  const overflowY = style.overflowY;
                  if ((overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') && cur.scrollHeight > cur.clientHeight) {
                    return cur;
                  }
                  cur = cur.parentElement;
                }
                return null;
              };

              const scrollContainer = findScrollContainer(target);
              if (scrollContainer) {
                const containerTop = target.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top + scrollContainer.scrollTop;
                scrollContainer.scrollTo({ top: containerTop, behavior: 'smooth' });
              } else {
                try { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch(e){}
              }
            }
          }, 200);
          if (history && typeof history.pushState === 'function') {
            history.pushState(null, '', href);
          } else {
            location.hash = href;
          }
          setTimeout(onScroll, 700);
          return;
        }
      }

      // Fallback para enlaces no-ancla o si no encontramos el objetivo
      setActive(this);
      // Re-evalúa el estado activo tras un pequeño retardo para permitir
      // que el navegador complete el scroll hacia el ancla.
      setTimeout(onScroll, 150);

      // Si el menú está en offcanvas (mobile), ciérralo tras el click
      const offcanvasEl = document.getElementById('mainNav');
      if (offcanvasEl && typeof bootstrap !== 'undefined') {
        const instance = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
        instance.hide();
      }
    });
  });

  // Si hay hash en la URL, marca el enlace correspondiente al cargar
  if (location.hash) {
    const target = Array.from(navLinks).find(l => l.getAttribute('href') === location.hash);
    if (target) setActive(target);
  }

  // También actualiza el enlace activo según la sección visible al hacer scroll
  const sectionLinks = Array.from(navLinks).map(l => ({
    link: l,
    section: document.querySelector(l.getAttribute('href'))
  })).filter(x => x.section);

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowH = window.innerHeight;
    const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const edgeThreshold = 50; // px — zona cerca del top/bottom donde no queremos marcar nada

    // Si estamos cerca del inicio o del final del documento, no marcar ningún enlace
    if (scrollY <= edgeThreshold) {
      setActive(null);
      return;
    }

    if (scrollY + windowH >= docHeight - edgeThreshold) {
      setActive(null);
      return;
    }

    const midpoint = windowH / 2;
    let matched = false;
    for (const item of sectionLinks) {
      const rect = item.section.getBoundingClientRect();
      if (rect.top <= midpoint && rect.bottom >= midpoint) {
        setActive(item.link);
        matched = true;
        break;
      }
    }

    if (!matched) setActive(null);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', onScroll);
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', onScroll);
  onScroll();

});
