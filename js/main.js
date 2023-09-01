const especialidades=[];
let contador=0;
let tiempo=0;

setTimeout(() => {
    let milisegundos = 3000; // Ajusta este valor según tus necesidades
    const doctor = document.querySelector('.doctor', null);
    if(doctor){
        const doctores=document.querySelectorAll('.doctor');
        const cantidadLineas = doctores.length; // Cuenta la cantidad de líneas
        tiempo = milisegundos * cantidadLineas;
        console.log(tiempo)
    }
    contarEspecialidades()
}, 1000);


function contarEspecialidades(){
    fetch('../php/turno_listar.php')
    .then(respuesta => respuesta.json())
    .then(arregloJson => {
        arregloJson.forEach((dato, index) => {
            if(dato.estatus=='A'){
                if(!especialidades.includes(dato.especialidad)){
                    especialidades.push(dato.especialidad)
                }
            }
        });
        const cantidadEspecialidades=especialidades.length;
        let especialidadSeleccionada=especialidades[contador];
        mostrar(especialidadSeleccionada)
        setInterval(() => {
            if(contador==(cantidadEspecialidades-1)){
                contador=0;
            }else{
                contador++;
            }
            especialidadSeleccionada=especialidades[contador];
            mostrar(especialidadSeleccionada);
        }, tiempo);
    })
    .catch(error => { console.error(`Atención ${error}`) });
}
function mostrar(especialidadSeleccionada) {
    const contenedor = document.getElementById(especialidadSeleccionada);
    contenedor.classList.remove('d-none', 'fade-out'); // Quita la clase "d-none" y "fade-out"
    contenedor.classList.add('fade-in'); // Agrega clases de animación
    setTimeout(() => {
        contenedor.classList.remove('fade-in');
        contenedor.classList.add('fade-out');
        setTimeout(() => {
            contenedor.classList.add('d-none');
        }, 800);
    }, tiempo-1000);
}




