// main.js - punto de entrada JavaScript

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM cargado. main.js activo.');
  // Aquí puedes inicializar componentes, listeners, etc.
  const acceptCheckbox = document.getElementById('acceptPolicies');
  const submitButton = document.getElementById('submitButton');
  if (acceptCheckbox && submitButton) {
    // Asegurar estado inicial
    submitButton.disabled = !acceptCheckbox.checked;
    // Escuchar cambios
    acceptCheckbox.addEventListener('change', function () {
      submitButton.disabled = !this.checked;
    });
  }
});
