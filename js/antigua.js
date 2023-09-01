

const especialidades = {};
const contenedor = document.getElementById('contenedor');
let contador=0;


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
        //imprimirtodo();
        imprimirSolo(especialidadSeleccionada)
        setInterval(() => {
            if(contador==(cantidadEspecialidades-1)){
                contador=0;
            }else{
                contador++;
            }
            especialidadSeleccionada = Object.keys(especialidades)[contador];
            imprimirSolo(especialidadSeleccionada);
        }, 3000);        
    })
    .catch(error => { console.error(`Atención ${error}`) });

function imprimirtodo(){
    // Update the HTML with the grouped horarios
    const especialidadesContainer = document.getElementById('cabeza');

    for (const especialidad in especialidades) {
        const especialidadDiv = document.createElement('div');
        especialidadDiv.classList.add('text-capitalize', 'text-warning', 'mt-5');
        
        const especialidadHeader = document.createElement('h1');
        especialidadHeader.textContent = `${especialidad}:`;
        especialidadDiv.appendChild(especialidadHeader);

        for (const medico in especialidades[especialidad]) {
            const medicoDiv = document.createElement('div');
            medicoDiv.classList.add('row', 'mt-5');
            
            const medicoNameDiv = document.createElement('div');
            medicoNameDiv.classList.add('col-12', 'col-lg-6', 'align-self-center', 'ps-lg-4', 'text-center', 'text-lg-start', 'doctor');
            const medicoName = document.createElement('h2');
            medicoName.textContent = medico;
            medicoNameDiv.appendChild(medicoName);
            medicoDiv.appendChild(medicoNameDiv);

            const horariosDiv = document.createElement('div');
            horariosDiv.classList.add('col-12', 'col-lg-3', 'text-center', 'text-lg-start', 'pt-1');
            for (const horario of especialidades[especialidad][medico]) {
                const horarioP = document.createElement('p');
                horarioP.textContent = horario;
                horariosDiv.appendChild(horarioP);
            }
            medicoDiv.appendChild(horariosDiv);

            // Consultorio
            const consultorioDiv = document.createElement('div');
            consultorioDiv.classList.add('col-12', 'col-lg-2', 'align-self-center');
            const consultorioH2 = document.createElement('h2');
            consultorioH2.classList.add('text-center');
            consultorioH2.textContent = 'consultorio: 02';
            consultorioDiv.appendChild(consultorioH2);
            medicoDiv.appendChild(consultorioDiv);

            especialidadDiv.appendChild(medicoDiv);

            // Agrega la línea horizontal después de cada médico
            const hr = document.createElement('hr');
            hr.classList.add('mx-5')
            especialidadDiv.appendChild(hr);
        }
        
        especialidadesContainer.appendChild(especialidadDiv);
    }
}

function imprimirSolo(especialidad){
    // Update the HTML with the grouped horarios
    const especialidadesContainer = document.getElementById('cabeza');
    especialidadesContainer.innerHTML='';

    if (especialidades[especialidad]) {
        const especialidadDiv = document.createElement('div');
        especialidadDiv.classList.add('text-capitalize', 'text-warning', 'mt-5');

        const especialidadHeader = document.createElement('h1');
        especialidadHeader.textContent = `${especialidad}:`;
        especialidadDiv.appendChild(especialidadHeader);

        for (const medico in especialidades[especialidad]) {
            const medicoDiv = document.createElement('div');
            medicoDiv.classList.add('row', 'mt-5');

            const medicoNameDiv = document.createElement('div');
            medicoNameDiv.classList.add('col-12', 'col-lg-6', 'align-self-center', 'ps-lg-4', 'text-center', 'text-lg-start', 'doctor');
            const medicoName = document.createElement('h2');
            medicoName.textContent = medico;
            medicoNameDiv.appendChild(medicoName);
            medicoDiv.appendChild(medicoNameDiv);

            const horariosDiv = document.createElement('div');
            horariosDiv.classList.add('col-12', 'col-lg-3', 'text-center', 'text-lg-start', 'pt-1');
            for (const horario of especialidades[especialidad][medico]) {
                const horarioP = document.createElement('p');
                horarioP.textContent = horario;
                horariosDiv.appendChild(horarioP);
            }
            medicoDiv.appendChild(horariosDiv);

            // Consultorio
            const consultorioDiv = document.createElement('div');
            consultorioDiv.classList.add('col-12', 'col-lg-2', 'align-self-center');
            const consultorioH2 = document.createElement('h2');
            consultorioH2.classList.add('text-center');
            consultorioH2.textContent = 'consultorio: 02';
            consultorioDiv.appendChild(consultorioH2);
            medicoDiv.appendChild(consultorioDiv);

            especialidadDiv.appendChild(medicoDiv);

            // Agrega la línea horizontal después de cada médico
            const hr = document.createElement('hr');
            hr.classList.add('mx-5');
            especialidadDiv.appendChild(hr);
        }

        especialidadesContainer.appendChild(especialidadDiv);
    }
}
