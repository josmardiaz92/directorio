const contenedorDirectorio=document.getElementById('contenedorDirectorio');
const especialidades = {};
const especialidadConsultorio={};
const especialidadC15={};
let contador=0;
let intervaloEspecialidades=0;
let medicosPorGrupo;
const pausaEntreGrupos = 10000;

fetch('../php/turno_listar.php')
    .then(respuesta => respuesta.json())
    .then(arregloJson => {
        arregloJson.forEach((dato, index) => {
            if (dato.estatus == 'A') {
                let {nombre, especialidad, dia, horario, consultorio, d15_tur} = dato;
                horario=`${dia} ${horario}`
                if (!especialidades[especialidad]) {
                    especialidades[especialidad] = {};
                    especialidadConsultorio[especialidad]={};
                    especialidadC15[especialidad]={}
                }
                if (!especialidades[especialidad][nombre]) {
                    especialidades[especialidad][nombre] = [];
                    especialidadConsultorio[especialidad][nombre]=[];
                    especialidadC15[especialidad][nombre]=[];
                }
                especialidades[especialidad][nombre].push(horario);
                especialidadConsultorio[especialidad][nombre].push(consultorio);
                especialidadC15[especialidad][nombre].push(d15_tur);
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
        }, intervaloEspecialidades);

    })
    .catch(error => { console.error(`Atención ${error}`) });

function imprimir(especialidad){
    let cantidadDoctores=Object.keys(especialidades[especialidad]).length;
    let paginas=cantidadDoctores/medicosPorGrupo;
        paginas=Math.ceil(paginas);
        intervaloEspecialidades=pausaEntreGrupos*paginas;

    contenedorDirectorio.innerHTML='';
    const hr=document.createElement('hr');
    hr.classList.add('mt-0','text-warning')
    const especialidadContenedor = document.createElement('div');

    let paginaActual=1;

    if (especialidades[especialidad]) {
        function imprimirGrupo(especialidad,grupoInicio) {
            const medicos = Object.keys(especialidades[especialidad]);
            const grupoFin = Math.min(grupoInicio + medicosPorGrupo, medicos.length);
            
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

            for (let i = grupoInicio; i < grupoFin; i++) {
                const medico = medicos[i];
            
                const medicoDirectorio = document.createElement('div');
                medicoDirectorio.classList.add('row','mt-5','justify-content-center');
                if(medico!=''){
                    const medicoNombreDivDirectorio = document.createElement('div');
                    medicoNombreDivDirectorio.classList.add('col-12', 'col-lg-4', 'align-self-center', 'ps-lg-4', 'text-center', 'text-lg-start', 'doctorDirectorio');
                    const medicoNombreDirectorio = document.createElement('h2');
                    medicoNombreDirectorio.textContent = medico;
                    medicoNombreDivDirectorio.appendChild(medicoNombreDirectorio);
                    medicoDirectorio.appendChild(medicoNombreDivDirectorio);
                }
                
    
                const horariosDirectorio = document.createElement('div');
                horariosDirectorio.classList.add('col-12', 'col-lg-5', 'text-center', 'text-lg-end', 'align-self-center', 'me-5');
                for (const horario of especialidades[especialidad][medico]) {
                    const horarioDirectorio = document.createElement('p');
                    horarioDirectorio.classList.add('fs-5','lineaDirectorio')
                    horarioDirectorio.textContent = horario;
                    horariosDirectorio.appendChild(horarioDirectorio);
                }
                for(const c15 of especialidadC15[especialidad][medico]){
                    if(c15=='A'){
                        const c15Directorio=document.createElement('p');
                        c15Directorio.textContent='Cada 15 Días';
                        horariosDirectorio.appendChild(c15Directorio);
                    }
                }
                medicoDirectorio.appendChild(horariosDirectorio);
    
                const consultorioDirectorio = document.createElement('div');
                consultorioDirectorio.classList.add('col-12', 'col-lg-2', 'align-self-center');
                let consultorioAnterior='';
                for(const consultorio of especialidadConsultorio[especialidad][medico]){
                    const consultorioNombreDirectorio = document.createElement('h2');
                    consultorioNombreDirectorio.classList.add('text-center');
                    if(isNaN(parseInt(consultorio))){
                        consultorioNombreDirectorio.innerHTML=consultorio;
                    }else{
                        consultorioNombreDirectorio.innerHTML=`consultorio N° ${consultorio}`;
                    }
                    if(consultorioAnterior!=consultorio){
                        consultorioDirectorio.appendChild(consultorioNombreDirectorio);
                        consultorioAnterior=consultorio;
                    }
                }
                medicoDirectorio.appendChild(consultorioDirectorio);
    
                especialidadContenedor.appendChild(medicoDirectorio);
    
                const hr = document.createElement('hr');
                hr.classList.add('mx-5','mt-0');
                especialidadContenedor.appendChild(hr);
            
                especialidadContenedor.appendChild(medicoDirectorio);
            }
            
            if (grupoFin < medicos.length) {
                setTimeout(() => {
                    paginaActual++;
                    especialidadContenedor.innerHTML = ''; // Limpia el contenido antes de imprimir el siguiente grupo
                    imprimirGrupo(especialidad,grupoFin);
                }, pausaEntreGrupos);
            }
            }
        imprimirGrupo(especialidad,0);
        contenedorDirectorio.appendChild(especialidadContenedor)
    }
}




