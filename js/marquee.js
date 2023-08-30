setTimeout(() => {
    const duracionPorLinea = 5; // Ajusta este valor según tus necesidades
    const marquee = document.querySelector('.marquee', null);
    if(marquee){
        const cantidadLineas = marquee.childElementCount; // Cuenta la cantidad de líneas en la marquesina
        const duracionAnimacion = duracionPorLinea * cantidadLineas;
        marquee.style.animationDuration = `${duracionAnimacion}s`;
        console.log(duracionAnimacion)
    }
}, 300);

