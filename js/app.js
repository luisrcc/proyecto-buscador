//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const color = document.querySelector('#color');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');

//contenedor de los resultados
const resultado = document.querySelector('#resultado');


const maxYear = new Date().getFullYear();
const minYear = maxYear -11;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    color: '',
    puertas: '',
    transmision: '',
    minimo: '',
    maximo: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos); //Mostrar los autos al cargar

    //Llenar años
    llenarSelect()
});

//Event listener para los formularios
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();

});

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;

    filtrarAuto();

});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();

});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();


});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    
    filtrarAuto();

});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();

});



//Funciones
function mostrarAutos(autos){

    limpiarHTML();// Elimina el HTML 

    autos.forEach(auto => {
        //destructuring o destructuracion 
        const {marca, modelo, year, puertas, transmision, color, precio} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca}
        ${modelo}
        - ${year}
        - ${puertas} Puertas
        - Transmision: ${transmision}
        -Color : ${color}
        -Precio: ${precio} $USD
    `;      

        //insertar en el HTML
        resultado.appendChild(autoHTML);

    });
}

//limpiar HTML con metodo while
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

}

function llenarSelect(){
    for(let i = maxYear; i >= minYear; i--){
        const opcion =  document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}
//funcion que filtra la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarColor).filter(filtrarTransmision).filter(filtrarPuertas);

    if (resultado.length){
        mostrarAutos(resultado)
    } else {
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, Intenta con otras Caracteristicas';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    } 
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === year;
    } 
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    } 
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }

    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }

    return auto;

}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }

    return auto;
}