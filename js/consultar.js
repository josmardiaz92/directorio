const identificador=document.getElementById('identificador').value;
const ruta=`../php/${identificador}_listar.php`;
let filtro='';
const btnFiltro=document.getElementById('filtro');
const modalAgregar=document.getElementById('modalAgregar');
const selectEspecialidad = modalAgregar.querySelector('#fky_esp', null);
const selectDoctor = modalAgregar.querySelector('#fky_doc', null);
const selectConsultorio = modalAgregar.querySelector('#fky_con', null);
const selectHorario = modalAgregar.querySelector('#fky_hor', null);
const modalEditar=document.getElementById('modalEditar');

consultarContenido();
btnFiltro.addEventListener('change',filtrar);

if(selectEspecialidad){
    let valor='';
    consultarListaEspecialidad(valor,selectEspecialidad);

}
if(selectDoctor){
    let valor='';
    consultarListaDoctor(valor,selectDoctor);
}
if(selectConsultorio){
    let valor='';
    consultarListaConsultorio(valor,selectConsultorio);
}
if(selectHorario){
    let valor='';
    consultarListaHorario(valor,selectHorario);
}

async function consultarContenido(){
    fetch(ruta)
    .then(respuesta=>respuesta.json())
    .then(arregloJson=>{
        console.log(arregloJson)
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
                case 'horario':
                    consultaHorario(index,element,status)
                    break;
                case 'doctor':
                    consultaSimple(index,element,status)
                    break;
                case 'turno':
                    consultarTurno(index,element,status)
                    break;
                default:
                    break;
            }
        })
        modalEditar.addEventListener('show.bs.modal',evento=>{
            let boton=evento.relatedTarget;
            let codigo=boton.getAttribute('data-bs-whatever');
            consultarUno(codigo,arregloJson);
        });
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
                                    <td>${element.nombre}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
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
            activarDesactivar();
        break;
        case false:
            if(!status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td>${element.nombre}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
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
            activarDesactivar();
        break;
        default:
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td>${element.nombre}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
                                    </td>
                                </tr>`;
            setTimeout(() => {
            const estadoElemento=document.getElementById(element.codigo);
            estadoElemento.checked=status;
            estadoElemento.value=status;
            }, 100);
            activarDesactivar();
        break;
        }
}

function consultaHorario(index,element,status){
    switch(filtro){
        case true:
            if(status){
                cuerpoTabla.innerHTML+=`
                <tr id="linea${index}">
                    <td id="${element.nombre}">${element.nombre}</td>
                    <td>${element.definicion}</td>
                    <td class="${element.estatus}">
                    <div class="form-check form-switch d-flex justify-content-center">
                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                    </div>
                    </td>
                    <td id="ver${index}">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
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
            activarDesactivar();
        break;
        case false:
            if(!status){
                cuerpoTabla.innerHTML+=`
                <tr id="linea${index}">
                    <td id="${element.nombre}">${element.nombre}</td>
                    <td>${element.definicion}</td>
                    <td class="${element.estatus}">
                    <div class="form-check form-switch d-flex justify-content-center">
                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                    </div>
                    </td>
                    <td id="ver${index}">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
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
            activarDesactivar();
        break;
        default:
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td>${element.definicion}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
                                    </td>
                                </tr>`;
            setTimeout(() => {
            const estadoElemento=document.getElementById(element.codigo);
            estadoElemento.checked=status;
            estadoElemento.value=status;
            }, 100);
            activarDesactivar();
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
                                    <td id="dia${index}">${element.dia}</td>
                                    <td id="horario${index}">${element.horario}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
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
            activarDesactivar();
        break;
        case false:
            if(!status){
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td>${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td id="consultorio${element.codigoconsultorio}">${element.consultorio}</td>
                                    <td id="dia${index}">${element.dia}</td>
                                    <td id="horario${index}">${element.horario}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
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
            activarDesactivar();
        break;
        default:
            cuerpoTabla.innerHTML+=`
                                <tr id="linea${index}">
                                    <td id="${element.nombre}">${element.nombre}</td>
                                    <td id="especialidad${element.codigoespecialidad}">${element.especialidad}</td>
                                    <td id="consultorio${element.codigoconsultorio}">${element.consultorio}</td>
                                    <td id="dia${index}">${element.dia}</td>
                                    <td id="horario${index}">${element.horario}</td>
                                    <td class="${element.estatus}">
                                    <div class="form-check form-switch d-flex justify-content-center">
                                        <input class="form-check-input estadoElemento" type="checkbox" role="switch" id="${element.codigo}">
                                    </div>
                                    </td>
                                    <td id="ver${index}">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" data-bs-whatever=${index}><i class="fa-solid fa-pen-to-square" style="color: #001A6F;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                        <i class="btn fa-solid fa-trash eliminar" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="right" title="Borrar" id="${element.codigo}"></i>
                                    </td>
                                </tr>`;
            setTimeout(() => {
            const estadoElemento=document.getElementById(element.codigo);
            estadoElemento.checked=status;
            estadoElemento.value=status;
            }, 100);
            activarDesactivar();
        break;
        }
}

function consultarListaEspecialidad(valor,select){
    select.innerHTML='<option value="">Seleccione...</option>';
    fetch(`../php/especialidad_listar.php`)
    .then(respuesta=>respuesta.json())
    .then(arregloJson=>{
        arregloJson.forEach(element=>{
            if(element.estatus=='A'){
                const option = document.createElement('option');
                option.value = element.codigo;
                option.textContent = element.nombre;
                if(valor===element.codigo){
                    option.selected=true;
                }
                select.appendChild(option);
            }
        })
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function consultarListaDoctor(valor,select){
    select.innerHTML='<option value="">Seleccione...</option>';
    fetch(`../php/doctor_listar.php`)
    .then(respuesta=>respuesta.json())
    .then(arregloJson=>{
        arregloJson.forEach((element,index)=>{
            if(element.estatus=='A'){
                const option = document.createElement('option');
                option.value = element.codigo;
                option.textContent = element.nombre;
                if(valor===element.codigo){
                    option.selected=true;
                }
                select.appendChild(option);
            }
        })
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function consultarListaConsultorio(valor,select){
    select.innerHTML='<option value="">Seleccione...</option>';
    fetch(`../php/consultorio_listar.php`)
    .then(respuesta=>respuesta.json())
    .then(arregloJson=>{
        arregloJson.forEach(element=>{
            if(element.estatus=='A'){
                const option = document.createElement('option');
                option.value = element.codigo;
                option.textContent = element.nombre;
                if(valor===element.codigo){
                    option.selected=true;
                }
                select.appendChild(option);
            }
        })
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function consultarListaHorario(valor,select){
    select.innerHTML='<option value="">Seleccione...</option>';
    fetch(`../php/horario_listar.php`)
    .then(respuesta=>respuesta.json())
    .then(arregloJson=>{
        arregloJson.forEach(element=>{
            if(element.estatus=='A'){
                const option = document.createElement('option');
                option.value = element.codigo;
                option.textContent = element.nombre;
                if(valor===element.codigo){
                    option.selected=true;
                }
                select.appendChild(option);
            }
        })
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function consultarUno(codigo,arregloJson){
    const nombre=modalEditar.querySelector('#nombre', null);
    const descripcion=modalEditar.querySelector('#def_hor', null);
    const doctor=modalEditar.querySelector('#doctor', null);
    const especialidad=modalEditar.querySelector('#especialidad', null);
    const horario=modalEditar.querySelector('#horario', null);
    const consultorio=modalEditar.querySelector('#consultorio', null);
    const d15=modalEditar.querySelector('#d15', null);

    if(nombre){
        nombre.value=arregloJson[codigo].nombre;
    }
    if(descripcion){
        descripcion.value=arregloJson[codigo].definicion;
    }
    if(doctor){
        valor=arregloJson[codigo].codigodoctor;
        consultarListaDoctor(valor,doctor);
    }
    if(especialidad){
        valor=arregloJson[codigo].codigoespecialidad;
        consultarListaEspecialidad(valor,especialidad);
    }
    if(horario){
        valor=arregloJson[codigo].codigohorario;
        consultarListaHorario(valor,horario);
    }
    if(consultorio){
        valor=arregloJson[codigo].codigoconsultorio;
        consultarListaConsultorio(valor,consultorio);
    }
    if(d15){
        valor=arregloJson[codigo].d15_tur;
        const opciones=d15.querySelectorAll('option');
        opciones.forEach(opcion=>{
            if(opcion.value==valor){
                opcion.selected=true;
            }
        })
    }
}