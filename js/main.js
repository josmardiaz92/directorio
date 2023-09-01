const especialidades=[];
const contenedor = document.getElementById('contenedor');
let contador=0;
const tiempo=5000;

setTimeout(() => {
    contarEspecialidades()
}, 200);


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

function mostrar(especialidadSeleccionada){
    const contenedor=document.getElementById(especialidadSeleccionada);
    contenedor.classList.remove('d-none')
    setTimeout(() => {
        contenedor.classList.add('d-none')
    }, tiempo*0.96);
}

