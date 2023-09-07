const contenedorDirectorio=document.getElementById('contenedorDirectorio');
const elementosPorPagina=3;
const especialidades = {};
let contador=0;
let intervaloPaginas=3000;
let cantidadDoctores=0;
let paginas=0;
let paginaActual=0;
let doctor=0;



fetch('../php/turno_listar.php')
    .then(respuesta => respuesta.json())
    .then(arregloJson => {
        arregloJson.forEach((dato, index) => {
            if (dato.estatus == 'A') {
                const { nombre, especialidad, dia, desde, hasta } = dato;
                const horario = `${dia} ${desde} a ${hasta}`;
                if (!especialidades[especialidad]) {
                    especialidades[especialidad] = {};
                }
                if (!especialidades[especialidad][nombre]) {
                    especialidades[especialidad][nombre] = [];
                }
                especialidades[especialidad][nombre].push(horario);
            }
        });     
        const cantidadEspecialidades = Object.keys(especialidades).length;
        let especialidadSeleccionada = Object.keys(especialidades)[contador];
        imprimir(especialidadSeleccionada);
        setInterval(() => {
            if(contador==(cantidadEspecialidades-1)){
                contador=0;
            }else{
                contador++;
            }
            especialidadSeleccionada = Object.keys(especialidades)[contador];
            imprimir(especialidadSeleccionada);
        }, 3000);

    })
    .catch(error => { console.error(`Atención ${error}`) });

function imprimir(especialidad){
    cantidadDoctores=Object.keys(especialidades[especialidad]).length;
    paginas=cantidadDoctores/elementosPorPagina;
    paginas=Math.ceil(paginas);
    contenedorDirectorio.innerHTML='';
    const hr=document.createElement('hr');
    hr.classList.add('mt-0','text-warning');

    if (especialidades[especialidad]) {
        const especialidadContenedor = document.createElement('div');
        especialidadContenedor.classList.add('col-12', 'bg-dark', 'bordeRedondeado', 'especialidadContenedor');

        const cabezaDirectorio=document.createElement('div');
        cabezaDirectorio.classList.add('row', 'text-uppercase', 'textoEspecialidad', 'mt-5', 'ms-2');
        cabezaDirectorio.id='cabezaDirectorio';
        especialidadContenedor.appendChild(cabezaDirectorio);

        const especialidadDirectorio=document.createElement('div');
        especialidadDirectorio.classList.add('col-10');
        especialidadDirectorio.id='especialidadDirectorio';
        cabezaDirectorio.appendChild(especialidadDirectorio);
        const nombreEspecialidad=document.createElement('h1');
        nombreEspecialidad.textContent = `${especialidad}`;
        especialidadDirectorio.appendChild(nombreEspecialidad);

        if(paginas>=2){
            const numeroPaginaDirectorio=document.createElement('div');
            numeroPaginaDirectorio.classList.add('col','text-center');
            numeroPaginaDirectorio.id='numeroPaginaDirectorio';
            cabezaDirectorio.appendChild(numeroPaginaDirectorio);
            const pagina=document.createElement('p');
            pagina.textContent=`pagina ${paginaActual}/${paginas}`;
            numeroPaginaDirectorio.appendChild(pagina);
        }
        

        cabezaDirectorio.appendChild(hr);


        for (const medico in especialidades[especialidad]) {
            const medicoDirectorio = document.createElement('div');
            medicoDirectorio.classList.add('row','mt-5');

            const medicoNombreDivDirectorio = document.createElement('div');
            medicoNombreDivDirectorio.classList.add('col-12', 'col-lg-5', 'align-self-center', 'ps-lg-4', 'text-center', 'text-lg-start', 'doctorDirectorio');
            const medicoNombreDirectorio = document.createElement('h2');
            medicoNombreDirectorio.textContent = medico;
            medicoNombreDivDirectorio.appendChild(medicoNombreDirectorio);
            medicoDirectorio.appendChild(medicoNombreDivDirectorio);

            const horariosDirectorio = document.createElement('div');
            horariosDirectorio.classList.add('col-12', 'col-lg-4', 'text-center', 'text-lg-start', 'align-self-center');
            for (const horario of especialidades[especialidad][medico]) {
                const horarioDirectorio = document.createElement('p');
                horarioDirectorio.classList.add('fs-5','lineaDirectorio')
                horarioDirectorio.textContent = horario;
                horariosDirectorio.appendChild(horarioDirectorio);
            }
            medicoDirectorio.appendChild(horariosDirectorio);

            const consultorioDirectorio = document.createElement('div');
            consultorioDirectorio.classList.add('col-12', 'col-lg-2', 'align-self-center');
            const consultorioNombreDirectorio = document.createElement('h2');
            consultorioNombreDirectorio.classList.add('text-center');
            consultorioNombreDirectorio.textContent = 'consultorio: 02';
            consultorioDirectorio.appendChild(consultorioNombreDirectorio);
            medicoDirectorio.appendChild(consultorioDirectorio);

            especialidadContenedor.appendChild(medicoDirectorio);

            // Agrega la línea horizontal después de cada médico
            const hr = document.createElement('hr');
            hr.classList.add('mx-5','mt-0');
            especialidadContenedor.appendChild(hr);
        }
        contenedorDirectorio.appendChild(especialidadContenedor)
    }
}
