const contenedorTasaDolar=document.getElementById('tasaDolar');
const contenedorTasaEuro=document.getElementById('tasaEuro');
const contenedorTasaCop=document.getElementById('tasaCop');

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
