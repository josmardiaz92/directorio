setTimeout(() => {
    const estadoElemento=document.querySelectorAll('.eliminar');
    estadoElemento.forEach(elemento=>{
        elemento.addEventListener('click',evento=>{
            const campo=evento.target;
            const id=parseInt(campo.id);
            let consulta=`${identificador}_eliminar_definitivo`
            const formData=new FormData();
            formData.append("codigo",id);
            formData.append("consulta",consulta)
            fetch("../php/eliminar.php",{
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
        })
    })
}, 500);

