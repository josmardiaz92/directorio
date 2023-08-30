//TODO solo se validan campos que se ingresen por el usuario. los de seleccion multiple no necesitan validacion.
//TODO en este array, debe agregarse la expresion regular necesario para cada espacio a validar con su id
const expresionesRegulares = {
    nom_con: /^[A-Za-zÀ-ÖØ-öø-ÿ\s',0-9]+$/i,
    nom_esp: /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/i,
    nom_doc: /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/i,
    ent_tur: /^[0-2][0-9]:[0-5][0-9] (AM|PM)$/,
    sal_tur: /^[0-2][0-9]:[0-5][0-9] (AM|PM)$/
};

//TODO Aca tomamos todos los elementos a usar
const btnSubmit = document.getElementById("btnAgregar");
const elementos=document.querySelectorAll('.validar');
const instanciasValidar=[];
const alerta=document.getElementById('alerta');
const textoAlerta=document.getElementById('textoAlerta');
const alerta2=document.getElementById('alerta2');
const textoAlerta2=document.getElementById('textoAlerta2');
class validacion{
    constructor(id,nombre,valorOk,regex){
        this.id=id;
        this.nombre=nombre;
        this.valorOk=valorOk;
        this.regex=regex;
    }
    mostrar(){
        let informacion=`${this.id} ${this.nombre} ${this.valorOk} ${this.regex}`;
        console.log(informacion)
    }
    validar(){
        const campo=document.getElementById(this.id);
        campo.addEventListener('blur',evento=>{
            const campo=evento.target;
            const valor=campo.value;
            const valido=this.regex.test(valor);
            const texto=`El campo ${this.nombre} no es valido\nTome en cuenta lo siguiente:\n ${this.valorOk}`;
            const texto2=`El campo ${this.nombre} es valido`;
            campo.classList.toggle("casilla",!valido);
            campo.classList.toggle("is-valid", valido); //*Si valido es true, se agrega "is-valid" a la clase del elemento
            campo.classList.toggle("is-invalid", !valido); //*Si valido es false, se agrega "is-invalid" a la clase del elemento
            campo.classList.toggle("invalida", !valido); //*Si valido es false, se agrega "invalida" a la clase del elemento
            campo.nextElementSibling.classList.toggle("invalid-feedback", !valido); //*Si valido es false, se agrega "invalid-feedback" a la clase del siguiente elemento
            campo.nextElementSibling.innerText = valido ? " " : `Introduzca un valor válido`; //*Dependiendo del valor de valido, de agregará el primer valor para true o el 2do para false
            if(!valido){
                aparecer(alerta,textoAlerta,texto);
                    setTimeout(() => {
                        desaparecer(alerta);
                    }, 10000);
            }else{
                aparecer(alerta2,textoAlerta2,texto2);
                    setTimeout(() => {
                        desaparecer(alerta2);
                    }, 3000);
            }
            const casillasInvalidas=document.querySelectorAll('.is-invalid').length;
            if(casillasInvalidas>0){
                btnSubmit.disabled=true;
            }else{
                btnSubmit.disabled=false;
            }
        })
    }
}

elementos.forEach((elemento)=>{
    const id=elemento.id;
    const nombre=elemento.placeholder; //todo este sera el nombre entendible del camo, ejemplo... en vez de nom_cat, aca toma el placeholder para que diga nombre de la categoria.
    const valorOk=elemento.title; //todo este sera la referencia de como llenar adecuadamente el campo, eso se colocará en el title
    const regex=expresionesRegulares[id];
    const nuevaInstancia=new validacion(id,nombre,valorOk,regex);
    instanciasValidar.push(nuevaInstancia);
    nuevaInstancia.validar()
})

function desaparecer(elem){
    elem.style.opacity=1;
    (function cambio() //paraanidar funciones dentro de otras, se debe encerrar la anidad en parentesis
    {
        if((elem.style.opacity-=0.01)<0) // como la funcion va a ser llamada recursivamente, por eso plamnteamos esta condicional
        {
            elem.classList.add("d-none");
        }
        else
        {
            requestAnimationFrame(cambio); //con esto es que se hace la llamada recursiva. esta funcion informa al navegador que quieres realizar una animacion y solicita que el navegador programe el repintado de la ventana para el proximo ciclo de la animacion.
        }
    })(); //si no se lococan esos dos parentesis extras, no funciona la funcion, esto es porque es una funcion anidada.
}

function aparecer(elem,campoText,text){
elem.style.opacity=0;
elem.style.color='#0000FF';
elem.classList.remove('d-none');
campoText.innerText=text;
(function cambiar()
{
    let val=parseFloat(elem.style.opacity);
    if(!((val+=0.05)>1))
    {
        elem.style.opacity=val;
        requestAnimationFrame(cambiar);
    }
})();
}