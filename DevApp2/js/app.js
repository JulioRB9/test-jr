document.addEventListener('DOMContentLoaded', function(){
    //Paso 1: SELECCCIONA LOS ELEMENTOS DE LOS INTERFACEZ
    const campoEmail = document.querySelector('#email');
    const campoAsunto = document.querySelector('#asunto');
    const campoMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    // console.log(campoEmail);
    // console.log(campoAsunto);
    // console.log(campoMensaje);
    
    //PASO 2: ASIGNAR EVENTO AL CAMPO
    campoEmail.addEventListener('blur', validar);
    campoAsunto.addEventListener('blur', validar);
    campoMensaje.addEventListener('blur', validar);

    
    // validar();
    // function validar(e){
    //     console.log(e.target.value);
    // }
    function validar(e){
        if(e.target.value.trim() === ''){
            // console.log('Esta Vacio');
            mostrarAlerta();
        }else{
            console.log('Tiene datos');
        }
    }

    function mostrarAlerta(){
        const error = document.createElement('P');
        error.textContent = 'Hubo un error...';
        error.classList.add('bg-red-600','text-white','p-2','text-center');
        // console.log(error);


        // Inyectar el error al Fomulario
        formulario.appendChild(error);
        // formulario.innerHTML = error.innerHTML;
    }
});