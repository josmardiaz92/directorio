function hacerRecarga(){
    let accion = 'recargar';
    let url = "../py/controladores/accion_eliminar.py";
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "accion=" + accion,
    };
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log('eliminado');
            location.reload(true);
        })
        .catch(error => {console.error('Error:', error);
    });
}