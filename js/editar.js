const btnEditar=modalEditar.querySelector('#btnEditar');
const elementosEditar=modalEditar.querySelector('.editar');
function obtenerCodigo(codigo,arregloJson){
    let id=arregloJson[codigo].codigo;
    return id
}
function obtenerStatus(codigo,arregloJson){
    let estatus=arregloJson[codigo].estatus;
    return estatus
}

btnEditar.addEventListener('click',()=>{
    switch (identificador) {
        case 'consultorio':
            editarSimple();
            break;
        case 'especialidad':
            editarSimple();
            break;
        case 'doctor':
            editarSimple();
            break;
        case 'turno':
            editarTurno();
            break;
        case 'horario':
            editarHorario();
            break;
        default:
            break;
    }
});

function editarSimple(){
    consulta=`${identificador}_modificar`;
    const nombre=elementosEditar.value;
    const formData = new FormData();
    formData.append("nombre",nombre);
    formData.append("estatus",estatus);
    formData.append("id",id);
    formData.append("consulta",consulta);
    console.log(nombre, estatus, id)
    fetch("../php/editar.php",{
        method: "POST",
        body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                console.log('cambio realizado');
                window.location.reload();
            }
        })
        .catch(error => {
            console.error("Hubo un error al hacer el cambio: ", error);
        });
}

function editarHorario(){
    const nombre=modalEditar.querySelector('#nombre').value;
    const definicion=modalEditar.querySelector('#definicion').value.toUpperCase();
    consulta=`${identificador}_modificar`;
    const formData = new FormData();
    formData.append("consulta",consulta);
    formData.append("nombre",nombre);
    formData.append("definicion",definicion);
    formData.append("estatus",estatus);
    formData.append("id",id);
    fetch("../php/horario_editar.php",{
        method: "POST",
        body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('cambio realizado');
                window.location.reload();
            }
        })
        .catch(error => {
            console.error("Hubo un error al hacer el cambio: ", error);
        });
}

function editarTurno(){
    const doctor=modalEditar.querySelector('#doctor').value;
    const especialidad=modalEditar.querySelector('#especialidad').value;
    const dias=recolectarDias();
    const horario=modalEditar.querySelector('#horario').value;
    const consultorio=modalEditar.querySelector('#consultorio').value;
    const d15=modalEditar.querySelector('#d15').value;
    consulta=`${identificador}_modificar`;

    const formData = new FormData();
    formData.append("consulta",consulta);
    formData.append("doctor",doctor);
    formData.append("especialidad",especialidad);
    formData.append("dias",dias);
    formData.append("horario",horario);
    formData.append("consultorio",consultorio);
    formData.append("d15",d15);
    formData.append("estatus",estatus);
    formData.append("id",id);
    fetch("../php/turno_editar.php",{
        method: "POST",
        body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                console.log('cambio realizado');
                window.location.reload();
            }
        })
        .catch(error => {
            console.error("Hubo un error al hacer el cambio: ", error);
        });
}

function recolectarDias(){
    const checkboxes = modalEditar.querySelectorAll('.diasEditar');
    const diasSeleccionados = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
        diasSeleccionados.push(checkbox.value);
        }
    });
    const diasConcatenados = diasSeleccionados.join(', ');
    return diasConcatenados;
}