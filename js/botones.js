const btnContenedor=document.getElementById('contenedorBtn')
const especialidades=[];
let btns;

fetch('../php/turno_listar.php')
    .then(respuesta => respuesta.json())
    .then(arregloJson => {
        arregloJson.forEach(dato => {
            if(dato.estatus=='A'){
                if(!especialidades.includes(dato.especialidad)){
                    especialidades.push(dato.especialidad)
                }
            }
        });
        btnContenedor.innerHTML='';
        especialidades.forEach((dato,index)=>{
            btnContenedor.innerHTML+=`
            <button type="button" class="btn btn-outline-warning mt-3">
                <h1 class="btnEspecialidad" id="${dato}">
                    ${dato}
                </h1>
            </button>`;
            btns=document.querySelectorAll('.btnEspecialidad');
        })
        modal()
    })
    .catch(error => { console.error(`Atención ${error}`) });



function modal(){
    btns.forEach(elemento=>{
        elemento.addEventListener('click',evento=>{
            const campo=evento.target;
            const id=campo.id;
            const userData = {
                accion: id,
            };
            // Valor que deseas enviar al script CGI
            let accion = id; // Reemplaza esto con el valor deseado
            // URL del script CGI en tu servidor
            let url = "../py/controladores/accion_reanudar.py"; // Reemplaza con la ruta correcta a tu script

            // Configuración de la solicitud fetch
            let requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // El tipo de contenido debe coincidir con lo que espera el script CGI
                },
                body: "accion=" + accion, // Datos que se envían al script, en este caso, el valor de 'accion'
            };

            // Realizar la solicitud fetch
            fetch(url, requestOptions)
                .then(response => response.text()) // Obtener la respuesta como texto
                .then(result => {
                    console.log('activo'); // Resultado devuelto por el script CGI
                })
                .catch(error => {console.error('Error:', error);
            });
            setTimeout(() => {
                setTimeout(() => {
                    // URL del script CGI en tu servidor
                    let url = "../py/controladores/accion_eliminar.py"; // Reemplaza con la ruta correcta a tu script
                    console.log('aqui'+accion)
                    // Configuración de la solicitud fetch
                    let requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', // El tipo de contenido debe coincidir con lo que espera el script CGI
                        },
                        body: "accion=" + accion, // Datos que se envían al script, en este caso, el valor de 'accion'
                    };

                    // Realizar la solicitud fetch
                    fetch(url, requestOptions)
                        .then(response => response.text()) // Obtener la respuesta como texto
                        .then(result => {
                            console.log('eliminado'); // Resultado devuelto por el script CGI
                        })
                        .catch(error => {console.error('Error:', error);
                    
            });
                }, 50000);
            }, 300);
        })
    })
}
