// Variables
// const -> para no reacinar las variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//PASO 1: Funcion
cargarEventListen();

function cargarEventListen(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click',agregarCurso);

    // Eliminar curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    // Vaciasr el carritp
    vaciarCarrito.addEventListener('click',()=>{
        // console.log('vaciando carrito')
        articulosCarrito = [];
        limpiarHTML();
    })
}

// PASO 2: SELECCIONAR EL CURSO
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        // console.log("Agregando carrito");
        // console.log(e.target.parentElement.parentElement)
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimna del arreglo del articulo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        // console.log(articulosCarrito);
        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
}

// PASO 3: LEE EL CONTENIDO DEL CURSO CLIKEADO DEL BOTON DE AGREGAR CARRITO POR EL USUARIO
// Lee el contenido de HTML  al que  le dimos click y extraer la informacion  del curso
function leerDatosCurso(curso){
    // console.log(curso)

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:  curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    // console.log(existe)
    if(existe){
        // Actualizamos cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++; // Retorna el objeto actualizado
                return curso;
            }else{
                return curso;   // Retoprna los objeto que no son duplicados
            }
        });
        articulosCarrito = [...cursos]
    }else{
        // Egremanos el curso al carrito
        // console.log(infoCurso);
        // Arregar elemento al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    // console.log(articulosCarrito)
    carritoHTML();
}

// PASO 4: MUESTRA LA INFOMACION DEL CURSO EN EL HTML YA CON ESPECIFICANDO LA INFORMACION 
//         QUE NECESITAMOS QUE SE MUESTRE EN EL CARRO
// Muestra el carrito de compra en el HTML
function carritoHTML(){
    // Limpia el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {

        const {image,titulo,precio,cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${image}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</td>
        `;

        // Agrega el HTML  del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });
}

// Elimina los curso del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML= '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
} 