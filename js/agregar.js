const modalAgregar=document.getElementById('modalAgregar');
const btnAgregar=modalAgregar.querySelector('#btnAgregar');
const elementosAgregar=modalAgregar.querySelector('.agregar');

btnAgregar.addEventListener('click',()=>{
    switch (identificador) {
        case 'consultorio':
            agregarSimple();
            break;
        case 'especialidad':
            agregarSimple();
            break;
        case 'doctor':
            agregarDoctor();
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

function agregarDoctor(){
    const nombre=document.getElementById('nom_doc').value;
    const especialidad=document.getElementById('fky_esp').value;
    consulta=`${identificador}_agregar`;
    const formData = new FormData();
    formData.append("consulta",consulta);
    formData.append("nombre",nombre);
    formData.append("especialidad",especialidad);
    console.log(consulta, nombre, especialidad);
    fetch("../php/agregarDoctor.php",{
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