let accionEjecutableAnterior='';
let accionEjecutable='';

setInterval(() => {
    consultarRecarga();
}, 1000);

function consultarRecarga(){
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
                    if(accionEjecutable=='recargar'){
                        setTimeout(() => {
                            hacerRecarga();
                        }, 1000);
                    }
                }
            }
        })
        .catch(error => { console.error(`Atención ${error}`) });
}