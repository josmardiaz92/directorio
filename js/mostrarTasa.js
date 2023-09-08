const contenedorTasaDolar=document.getElementById('tasaDolar');
const contenedorTasaEuro=document.getElementById('tasaEuro');
const contenedorTasaCop=document.getElementById('tasaCop');
const fecha = mostrarFecha();
const contenedorFecha=document.getElementById('fecha');
contenedorFecha.innerHTML=fecha;

/* fetch('../py/controladores/divisa_obtener.py')
    .then(respuesta=>respuesta.json())
    .then(respuesta=>{
        console.log(respuesta);
    })
    .catch(error => { console.error(`Atención ${error}`)}); */

setTimeout(() => {
    fetch('../py/controladores/divisa_listar.py')
        .then(respuesta=>respuesta.json())
        .then(arregloJson=>{
            if('USD' in arregloJson){
                const valorDolar=parseFloat(arregloJson['USD']).toFixed(2)
                contenedorTasaDolar.innerHTML=`Bs/USD ${valorDolar}`
            }
            if('EUR' in arregloJson){
                const valorEUR=parseFloat(arregloJson['EUR']).toFixed(2)
                contenedorTasaEuro.innerHTML=`Bs/EUR ${valorEUR}`
            }
            if('COP' in arregloJson){
                const valorCOP=parseFloat(arregloJson['COP']).toFixed(2)
                contenedorTasaCop.innerHTML=`Bs/COP ${valorCOP}`
            }
        })
        .catch(error => { console.error(`Atención ${error}`) });
}, 1000);

function mostrarFecha() {
    const fechaActual = new Date();

    // Días de la semana
    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

    // Meses
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    // Obtiene el día de la semana, el día del mes, el mes y el año
    const diaSemana = diasSemana[fechaActual.getDay()];
    const diaMes = fechaActual.getDate();
    const mes = meses[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();

    // Formatea la fecha en el formato deseado
    const fechaFormateada = `${diaSemana}, ${diaMes} de ${mes} de ${año}`;
    return fechaFormateada;
}

