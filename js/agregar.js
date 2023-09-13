const modalAgregar=document.getElementById('modalAgregar');
const btnAgregar=modalAgregar.querySelector('#btnAgregar');
const elementosAgregar=modalAgregar.querySelector('.agregar');

btnAgregar.addEventListener('click',()=>{
    console.log('dada')
    switch (identificador) {
        case 'consultorio':
            agregarSimple();
            break;
        case 'especialidad':
            agregarSimple();
            break;
        case 'doctor':
            agregarSimple();
            break;
        case 'turno':
            agregarTurno();
            break;
        case 'horario':
            agregarHorario();
            break;
        default:
            break;
    }
});

function agregarSimple(){
    consulta=`${identificador}_agregar`;
    const nombre=elementosAgregar.value;
    const formData = new FormData();
    formData.append("nombre",nombre);
    formData.append("consulta",consulta);
    fetch("../php/agregar.php",{
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

function agregarHorario(){
    const nombre=document.getElementById('nom_hor').value;
    const definicion=document.getElementById('def_hor').value.toUpperCase();
    consulta=`${identificador}_agregar`;
    const formData = new FormData();
    formData.append("consulta",consulta);
    formData.append("nombre",nombre);
    formData.append("definicion",definicion);
    fetch("../php/horario_agregar.php",{
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

function agregarTurno(){
    const doctor=document.getElementById('fky_doc').value;
    const consultorio=document.getElementById('fky_con').value;
    const dia=document.getElementById('fky_dia').value;
    const desde=document.getElementById('ent_tur').value;
    const hasta=document.getElementById('sal_tur').value;
    consulta=`${identificador}_agregar`;
    console.log(consulta, doctor, consultorio, dia, desde, hasta);

    const formData = new FormData();
    formData.append("consulta",consulta);
    formData.append("doctor",doctor);
    formData.append("consultorio",consultorio);
    formData.append("dia",dia);
    formData.append("desde",desde);
    formData.append("hasta",hasta);
    fetch("../php/turno_agregar.php",{
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