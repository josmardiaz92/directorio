const btnRecargar=document.getElementById('recargar');

btnRecargar.addEventListener('click', pedirRecarga);

function pedirRecarga(){
    let accion = 'recargar';
    let url = "../py/controladores/accion_reanudar.py";
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "accion=" + accion,
    };

    // Realizar la solicitud fetch
    fetch(url, requestOptions)
        .then(response => response.text()) // Obtener la respuesta como texto
        .then(result => {
            console.log('activo'); // Resultado devuelto por el script CGI
        })
        .catch(error => {console.error('Error:', error);
    });
}