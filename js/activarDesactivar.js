function activarDesactivar() {
    const estadoElemento = document.querySelectorAll('.estadoElemento');
    estadoElemento.forEach(elemento => {
        elemento.addEventListener('change', evento => {
            const campo = evento.target;
            const id = parseInt(campo.id);
            if (campo.checked) {
                let consulta = `${identificador}_reanudar`;
                console.log(consulta);
                const formData = new FormData();
                formData.append("codigo", id);
                formData.append("consulta", consulta);
                fetch("../php/eliminarReanudar.php", {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log('cambio realizado');
                        }
                    })
                    .catch(error => {
                        console.error("Hubo un error al hacer el cambio: ", error);
                    });
            } else {
                let consulta = `${identificador}_eliminar`;
                console.log(consulta);
                const formData = new FormData();
                formData.append("codigo", id);
                formData.append("consulta", consulta);
                fetch("../php/eliminarReanudar.php", {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log('cambio realizado');
                        }
                    })
                    .catch(error => {
                        console.error("Hubo un error al hacer el cambio: ", error);
                    });
            }

        });
    });
}

