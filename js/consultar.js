const identificador=document.getElementById('identificador').value;
const ruta=`../php/${identificador}_listar.php`;
let filtro='';
const btnFiltro=document.getElementById('filtro');

consultarContenido();
btnFiltro.addEventListener('change',filtrar);

async function consultarContenido(){
    fetch(ruta)
    .then(respuesta=>respuesta.json())
    .then(arregloJson=>{
        cuerpoTabla.innerHTML='';
        arregloJson.forEach((element,index)=>{
            let status='';
            //*Aca se le da un valor visible al status
            switch (element.estatus) {
            case 'A':
                status=true;              
                break;
            case 'I':
                status=false;              
                break;
            default:
                status=''
                break;
            }
            switch (identificador) {
                case 'consultorio':
                    consultaSimple(index,element,status)
                    break;
                case 'especialidad':
                    consultaSimple(index,element,status)
                    break;
                case 'dia_laborable':
                    consultaSimple(index,element,status)
                    break;
                case 'doctor':
                    consultarDoctor(index,element,status)
                    break;
                case 'turno':
                    consultarTurno(index,element,status)
                    break;
                default:
                    break;
            }
            })

    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function filtrar(){
    let valorFiltro=btnFiltro.value;
    switch(valorFiltro){
    case 'true':
        filtro=true;
    break;
    case 'false':
        filtro=false;
    break;
    default:
        filtro='';
    break;
    }
    consultarContenido();
}

function consultaSimple(index,element,status){
    switch(filtro){
        case true:
            if(status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            }
            if(filtro===status){
            setTimeout(() => {
                const estadoElemento=document.getElementById(element.codigo);
                estadoElemento.checked=status;
                estadoElemento.value=status;
            }, 100);
            }
        break;
        case false:
            if(!status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            }
            if(filtro===status){
            setTimeout(() => {
                const estadoElemento=document.getElementById(element.codigo);
                estadoElemento.checked=status;
                estadoElemento.value=status;
            }, 100);
            }
        break;
        default:
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            setTimeout(() => {
            const estadoElemento=document.getElementById(element.codigo);
            estadoElemento.checked=status;
            estadoElemento.value=status;
            }, 100);
        break;
        }
}

function consultarDoctor(index,element,status){
    switch(filtro){
        case true:
            if(status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            }
            if(filtro===status){
            setTimeout(() => {
                const estadoElemento=document.getElementById(element.codigo);
                estadoElemento.checked=status;
                estadoElemento.value=status;
            }, 100);
            }
        break;
        case false:
            if(!status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            }
            if(filtro===status){
            setTimeout(() => {
                const estadoElemento=document.getElementById(element.codigo);
                estadoElemento.checked=status;
                estadoElemento.value=status;
            }, 100);
            }
        break;
        default:
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            setTimeout(() => {
            const estadoElemento=document.getElementById(element.codigo);
            estadoElemento.checked=status;
            estadoElemento.value=status;
            }, 100);
        break;
        }
}

function consultarTurno(index,element,status){
    switch(filtro){
        case true:
            if(status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td id="consultorio${element.codigoconsultorio}">${element.consultorio}</td>
                                    <td id="dia${element.codigodia}">${element.dia}</td>
                                    <td id="horario${index}">${element.desde} - ${element.hasta}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            }
            if(filtro===status){
            setTimeout(() => {
                const estadoElemento=document.getElementById(element.codigo);
                estadoElemento.checked=status;
                estadoElemento.value=status;
            }, 100);
            }
        break;
        case false:
            if(!status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td id="consultorio${element.codigoconsultorio}">${element.consultorio}</td>
                                    <td id="dia${element.codigodia}">${element.dia}</td>
                                    <td id="horario${index}">${element.desde} - ${element.hasta}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            }
            if(filtro===status){
            setTimeout(() => {
                const estadoElemento=document.getElementById(element.codigo);
                estadoElemento.checked=status;
                estadoElemento.value=status;
            }, 100);
            }
        break;
        default:
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td id="consultorio${element.codigoconsultorio}">${element.consultorio}</td>
                                    <td id="dia${element.codigodia}">${element.dia}</td>
                                    <td id="horario${index}">${element.desde} - ${element.hasta}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.codigo}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                    </td>
                                </tr>`;
            setTimeout(() => {
            const estadoElemento=document.getElementById(element.codigo);
            estadoElemento.checked=status;
            estadoElemento.value=status;
            }, 100);
        break;
        }
}