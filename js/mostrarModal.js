const contenedorModal=document.getElementById('containerModal');
let accionEjecutable='';

setInterval(() => {
    tomarAcciones()
}, 1000);

function tomarAcciones() {
    // Make an AJAX request to the Python endpoint
    axios({
        method: "GET",
        url: "../py/controladores/accion_listar.py",
    })
        .then((response) => {
            // Do something with the response data
            accionEjecutable = response.data;
            if(accionEjecutable.trim()=='None'){
                accionEjecutable=''
            }
            mostrar(accionEjecutable);
        })
        .catch((error) => {
            console.log(error);
        });
}

function mostrar(accionEjecutable){
    let valido=false;
    if(accionEjecutable!=''){
        valido=true;
    }else{
        valido=false;
    }
    console.log(valido)
    console.log(accionEjecutable)

    contenedorModal.classList.toggle("d-none", !valido);
}