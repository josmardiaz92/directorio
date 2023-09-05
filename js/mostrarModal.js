const contenedorModal=document.getElementById('containerModal');
let accionEjecutableAnterior='';
let accionEjecutable='';

setInterval(() => {
    tomarAcciones()
}, 1000);

function tomarAcciones() {
    axios({
        method: "GET",
        url: "../py/controladores/accion_listar.py",
    })
        .then((response) => {
            accionEjecutable = response.data;
            if(accionEjecutable.trim()=='None'){
                accionEjecutable=''
            }
            if(accionEjecutableAnterior!=accionEjecutable){
                mostrarModal(accionEjecutable.trim());
                imprimir(accionEjecutable.trim());
                accionEjecutableAnterior=accionEjecutable;
                console.log(accionEjecutable,accionEjecutableAnterior)
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function mostrarModal(accionEjecutable){
    let valido=false;
    if(accionEjecutable!=''){
        valido=true;
    }else{
        valido=false;
    }
    contenedorModal.classList.toggle("d-none", !valido);
}

function imprimir(especialidad){
    contenedorModal.innerHTML='';
    if(especialidades[especialidad]){
        const espDiv=document.createElement('div');
        espDiv.classList.add('text-capitalize', 'text-warning');
        const espHeader=document.createElement('h1');
        espHeader.textContent = `${especialidad}:             pagina 1 de 2`;
        espDiv.appendChild(espHeader);
        for(const med in especialidades[especialidad]){
            const medDiv=document.createElement('div');
            medDiv.classList.add('row', 'mt-5');
            const medDivName=document.createElement('div');
            medDivName.classList.add('col-12', 'col-lg-6', 'align-self-center', 'ps-lg-4', 'text-center', 'text-lg-start', 'doctor');
            const medName=document.createElement('h2');
            medName.textContent = med;
            medDivName.appendChild(medName);
            medDiv.appendChild(medDivName);
            const horsDiv=document.createElement('div');
            horsDiv.classList.add('col-12', 'col-lg-3', 'text-center', 'text-lg-start', 'align-self-center');
            for(const hor of especialidades[especialidad][med]){
                const horP=document.createElement('p');
                horP.textContent=hor;
                horsDiv.appendChild(horP);
            }
            medDiv.appendChild(horsDiv);
            const consDiv=document.createElement('div');
            consDiv.classList.add('col-12', 'col-lg-2', 'align-self-center');
            const consH2=document.createElement('h2');
            consH2.classList.add('text-center');
            consH2.textContent = 'consultorio: 02';
            consDiv.appendChild(consH2);
            medDiv.appendChild(consDiv);

            espDiv.appendChild(medDiv);

            const hrMod=document.createElement('hr');
            hrMod.classList.add('mx-5');
            espDiv.appendChild(hrMod);
        }
    contenedorModal.appendChild(espDiv);
    }
}