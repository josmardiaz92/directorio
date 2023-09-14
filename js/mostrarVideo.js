const contenedorVideo=document.getElementById('contenedorVideo');
const botones=document.getElementById('botones');
const video=document.getElementById('video');
const source=video.querySelector('source');
const body=document.querySelector('body');
const tiempoInactividad = 60 * 1000 * 2;
let temporizadorInactividad;

// Función para reiniciar el temporizador
function reiniciarTemporizadorInactividad() {
    clearTimeout(temporizadorInactividad);
    botones.classList.remove('d-none');
    contenedorVideo.classList.add('d-none');
    body.classList='bg-dark';
    source.src='#';
    temporizadorInactividad = setTimeout(ventanaInactiva, tiempoInactividad);
}

// Función que se ejecuta cuando la ventana se considera inactiva
function ventanaInactiva() {
    botones.classList.add('d-none');
    contenedorVideo.classList.remove('d-none');
    body.classList='bg-light';
    source.src='../videos/Sitel-mat Animacion.mp4';
    video.load();
    console.log('La ventana está inactiva.');
}

// Eventos que indican la interacción del usuario
window.addEventListener('mousemove', reiniciarTemporizadorInactividad);
window.addEventListener('keydown', reiniciarTemporizadorInactividad);
window.addEventListener('click', reiniciarTemporizadorInactividad);
// Agrega más eventos según sea necesario, dependiendo de qué interacciones deseas rastrear.

// Iniciar el temporizador cuando se carga la página
reiniciarTemporizadorInactividad();
