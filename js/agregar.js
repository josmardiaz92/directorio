const btnAgregar=modalAgregar.querySelector('#btnAgregar');
const elementosAgregar=modalAgregar.querySelector('.agregar');

btnAgregar.addEventListener('click',()=>{
    console.log('adada')
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
    const especialidad=document.getElementById('fky_esp').value;
    const dias=recolectarDias();
    const horario=document.getElementById('fky_hor').value;
    const consultorio=document.getElementById('fky_con').value;
    const d15=document.getElementById('d15_tur').value;
    consulta=`${identificador}_agregar`;
    console.log(doctor, especialidad, dias, horario, consultorio, d15, consulta)

    const formData = new FormData();
    formData.append("consulta",consulta);
    formData.append("doctor",doctor);
    formData.append("especialidad",especialidad);
    formData.append("dias",dias);
    formData.append("horario",horario);
    formData.append("consultorio",consultorio);
    formData.append("d15",d15);
    fetch("../php/turno_agregar.php",{
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
    const checkboxes = document.querySelectorAll('.diasSemana');
    const diasSeleccionados = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
        diasSeleccionados.push(checkbox.value);
        }
    });
    const diasConcatenados = diasSeleccionados.join(', ');
    return diasConcatenados;
}