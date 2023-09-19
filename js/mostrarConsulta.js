const contenedorConsulta=document.getElementById('contenedorConsulta');
const contenedorDirectorioC=document.getElementById('contenedorDirectorio')
let accionEjecutableAnterior='';
let accionEjecutable='';
medicosPorGrupo = 6;

setInterval(() => {
    consultarAcciones();
}, 1000);

function consultarAcciones(){
    fetch('../py/controladores/accion_listar.py')
        .then(respuesta=>respuesta.json())
        .then(arregloJson=>{
            if(arregloJson==null){
                accionEjecutable='';
            }else{
                accionEjecutable=arregloJson;
            }
            if(accionEjecutableAnterior!=accionEjecutable){
                accionEjecutableAnterior=accionEjecutable;
                if(accionEjecutable!=''){
                    if(accionEjecutable!='recargar'){
                        mostrarConsulta(accionEjecutable);
                        imprimirConsulta(especialidades,accionEjecutable);
                        setTimeout(() => {
                            let url = "../py/controladores/accion_eliminar.py";
                            let requestOptions = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: "accion=" + accionEjecutable,
                            };
                            fetch(url, requestOptions)
                                .then(response => response.text())
                                .then(result => {
                                    console.log('eliminado');
                                })
                                .catch(error => {console.error('Error:', error);
                            });
                        }, intervaloEspecialidades);
                    }else{
                        setTimeout(() => {
                            hacerRecarga();
                        }, 1000);
                    }
                }else{
                    mostrarConsulta(accionEjecutable);
                }
                
            }
        })
        .catch(error => { console.error(`Atención ${error}`) });
}

function mostrarConsulta(accionEjecutable){
    let valido=false;
    if(accionEjecutable!='' && accionEjecutable!='recargar'){
        valido=true;
    }else{
        valido=false;
    }
    contenedorDirectorioC.classList.toggle('d-none', valido);
    contenedorConsulta.classList.toggle('d-none', !valido);
}

function imprimirConsulta(especialidades,especialidad){
    especialidad=especialidad.trim();
    let cantidadDoctores=Object.keys(especialidades[especialidad]).length;
    let paginas=cantidadDoctores/medicosPorGrupo;
        paginas=Math.ceil(paginas);
        intervaloEspecialidades=pausaEntreGrupos*paginas;

    contenedorConsulta.innerHTML='';
    const hr=document.createElement('hr');
    hr.classList.add('mt-0','text-warning')
    const especialidadContenedor = document.createElement('div');

    let paginaActual=1;

    if (especialidades[especialidad]) {
        function imprimirGrupoConsulta(especialidad,grupoInicio) {
            const medicos = Object.keys(especialidades[especialidad]);
            const grupoFin = Math.min(grupoInicio + medicosPorGrupo, medicos.length);
            
            especialidadContenedor.classList.add('col-12', 'bg-dark', 'bordeRedondeado', 'especialidadContenedor');

            const cabezaConsulta=document.createElement('div');
            cabezaConsulta.classList.add('row', 'text-uppercase', 'textoEspecialidad', 'mt-5', 'ms-2');
            cabezaConsulta.id='cabezaConsulta';
            especialidadContenedor.appendChild(cabezaConsulta);

            const especialidadConsulta=document.createElement('div');
            especialidadConsulta.classList.add('col-10');
            especialidadConsulta.id='especialidadConsulta';
            cabezaConsulta.appendChild(especialidadConsulta);
            const nombreEspecialidad=document.createElement('h1');
            nombreEspecialidad.textContent = `${especialidad}`;
            especialidadConsulta.appendChild(nombreEspecialidad);

            if(paginas>=2){
                const numeroPaginaConsulta=document.createElement('div');
                numeroPaginaConsulta.classList.add('col','text-center');
                numeroPaginaConsulta.id='numeroPaginaConsulta';
                cabezaConsulta.appendChild(numeroPaginaConsulta);
                const pagina=document.createElement('p');
                pagina.textContent=`pagina ${paginaActual}/${paginas}`;
                numeroPaginaConsulta.appendChild(pagina);
            }

            for (let i = grupoInicio; i < grupoFin; i++) {
                const medico = medicos[i];
            
                const medicoConsulta = document.createElement('div');
                medicoConsulta.classList.add('row','mt-5','justify-content-center');
                if(medico!=''){
                    const medicoNombreDivConsulta = document.createElement('div');
                    medicoNombreDivConsulta.classList.add('col-12', 'col-lg-4', 'align-self-center', 'ps-lg-4', 'text-center', 'text-lg-start', 'doctorConsulta');
                    const medicoNombreConsulta = document.createElement('h2');
                    medicoNombreConsulta.textContent = medico;
                    medicoNombreDivConsulta.appendChild(medicoNombreConsulta);
                    medicoConsulta.appendChild(medicoNombreDivConsulta);
                }
                
    
                const horariosConsulta = document.createElement('div');
                horariosConsulta.classList.add('col-12', 'col-lg-5', 'text-center', 'text-lg-end', 'align-self-center', 'me-5');
                for (const horario of especialidades[especialidad][medico]) {
                    const horarioConsulta = document.createElement('p');
                    horarioConsulta.classList.add('fs-5','lineaConsulta')
                    horarioConsulta.textContent = horario;
                    horariosConsulta.appendChild(horarioConsulta);
                }
                for(const c15 of especialidadC15[especialidad][medico]){
                    if(c15=='A'){
                        const c15Consulta=document.createElement('p');
                        c15Consulta.textContent='Cada 15 Días';
                        horariosConsulta.appendChild(c15Consulta);
                    }
                    
                }
                medicoConsulta.appendChild(horariosConsulta);
    
                const consultorioConsulta = document.createElement('div');
                consultorioConsulta.classList.add('col-12', 'col-lg-2', 'align-self-center');
                let consultorioAnterior='';
                for(const consultorio of especialidadConsultorio[especialidad][medico]){
                    const consultorioNombreConsulta = document.createElement('h2');
                    consultorioNombreConsulta.classList.add('text-center');
                    if(isNaN(parseInt(consultorio))){
                        consultorioNombreConsulta.innerHTML=consultorio;
                    }else{
                        consultorioNombreConsulta.innerHTML=`consultorio N° ${consultorio}`;
                    }
                    if(consultorioAnterior!=consultorio){
                        consultorioConsulta.appendChild(consultorioNombreConsulta);
                        consultorioAnterior=consultorio;
                    }
                }
                medicoConsulta.appendChild(consultorioConsulta);
    
                especialidadContenedor.appendChild(medicoConsulta);
    
                const hr = document.createElement('hr');
                hr.classList.add('mx-5','mt-0');
                especialidadContenedor.appendChild(hr);
            
                especialidadContenedor.appendChild(medicoConsulta);
            }
            
            if (grupoFin < medicos.length) {
                setTimeout(() => {
                    paginaActual++;
                    especialidadContenedor.innerHTML = ''; // Limpia el contenido antes de imprimir el siguiente grupo
                    imprimirGrupoConsulta(especialidad,grupoFin);
                }, pausaEntreGrupos);
            }
            }
        imprimirGrupoConsulta(especialidad,0);
        contenedorConsulta.appendChild(especialidadContenedor)
    }
}