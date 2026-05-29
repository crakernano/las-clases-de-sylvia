document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  // Comprueba si el usuario ya ha interactuado con la barra
  if (!localStorage.getItem("cookieConsent")) {
    banner.style.display = "block";
  }

  // Si el usuario hace clic en 'Aceptar'
  acceptBtn.addEventListener("click", function() {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    // Aquí puedes activar scripts de análisis o publicidad
  });

  // Si el usuario hace clic en 'Rechazar'
  rejectBtn.addEventListener("click", function() {
    localStorage.setItem("cookieConsent", "rejected");
    banner.style.display = "none";
    // Aquí puedes bloquear las cookies no esenciales
  });
});