//Variables
const formulario = document.querySelector('#formulario');
const listaIdeas = document.querySelector('#lista-ideas');
let ideas = [];

 
//Event Listeners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega una nueva idea
    formulario.addEventListener('submit', agregarIdea)

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        ideas = JSON.parse(localStorage.getItem('ideas')) || []; //si no hay nada en el ls se ve un arreglo vacio

        crearHTML();
    });

}


//Funciones
function agregarIdea(e){
    e.preventDefault();

    //textarea donde el usuario escribe
    const idea = document.querySelector('#tweet').value;

    //validacion
    if (idea === '') {
        mostrarError('Un mensaje no puede ir vacio');

        return; //previene que se sigan ejecutando mas lineas de codigo
    }

    const ideasObj = {
        id: Date.now(),
        idea
    }

    ideas = [...ideas, ideasObj];

    //Crear el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminarlo despues de unos segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//Mostrar listado de las ideas
function crearHTML(){
    limpiarHTML();  

    if (ideas.length > 0) {
        ideas.forEach( idea =>{
            //crear un boton para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarIdea(idea.id);
            }


            //crear el HTML
            const li = document.createElement('li');

            //añadir texto 
            li.textContent = idea.idea;
            
            //asignar el boton
            li.appendChild(btnEliminar);

            //insertarlo en el HTML
            listaIdeas.appendChild(li);
        }); 
    }

    sincronizarStorage();
};

//Agregar las ideas actuales a Storage
function sincronizarStorage(){
    localStorage.setItem('ideas', JSON.stringify(ideas))
};

//Borrar Idea
function borrarIdea(id){
    ideas = ideas.filter( idea => idea.id !== id);

    crearHTML();
}

//Limpiar el HTML
function limpiarHTML(){
    while( listaIdeas.firstChild){
        listaIdeas.removeChild(listaIdeas.firstChild);
    }
}