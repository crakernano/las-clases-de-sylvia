//ToDo: Optimizar esto
// Funciones para mostrar/ocultar secciones por id
function change2RevisionCV(){
    const presentaciones = document.getElementById('presentaciones-ingles-frances');
    const preparar = document.getElementById('preparar-entrevistas');
	const revision = document.getElementById('revision-cv');

    preparar.style.display = 'none';
    revision.style.display = 'flex';
    presentaciones.style.display = 'none';
}

function change2PrepararEntrevistas(){
    const presentaciones = document.getElementById('presentaciones-ingles-frances');
    const preparar = document.getElementById('preparar-entrevistas');
	const revision = document.getElementById('revision-cv');

    preparar.style.display = 'flex';
    revision.style.display = 'none';
    presentaciones.style.display = 'none';
}

function change2Presentaciones(){
    const presentaciones = document.getElementById('presentaciones-ingles-frances');
    const preparar = document.getElementById('preparar-entrevistas');
	const revision = document.getElementById('revision-cv');

    preparar.style.display = 'none';
    revision.style.display = 'none';
    presentaciones.style.display = 'flex';
}

window.change2RevisionCV= change2RevisionCV;
//export { change2RevisionCV };

