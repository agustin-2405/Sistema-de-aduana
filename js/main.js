// ! Linea para agregar formulario no funcional
// formularioContenedor.addEventListener('submit', (e) => {
//     const nuevoFormulario = document.createElement('form');
//     nuevoFormulario.id = 'persona-2'
//     nuevoFormulario.classList.add('formularioContenedor');

//     const checkAgregarPersona = document.querySelector('input[type="checkbox"]')
//     console.log(checkAgregarPersona.checked)
//     nuevoFormulario.innerHTML = `
//                         <label for="nombre">Nombre</label>
//                         <input type="text" name="nombre" required>
//                         <label for="apellido">Apellidos</label>
//                         <input type="text" name="apellido" required>
//                         <label for="documento">N° de documento</label>
//                         <input type="number" name="documento" required>
//                         <label for="fechaNacimiento">Fecha de Nacimiento</label>
//                         <input type="date" name="fechaNacimiento" required>
//                         <label for="destino">Lugar de destino</label>
//                         <input type="text" name="destino" required>
//                         <div class="formularioBotones">
//                             <input type="submit" class="enviarFormulario" value="Enviar">
//                         </div>
//                         <div class="codigoGenerado inputVacio"></div>
//                             `;
//     nuevoFormulario.classList.add('formularioNuevo')

//     console.log(formulario2, 'despues de clickear')
                            
//     datosPersona1 = Object.fromEntries(new FormData(e.target))
//     console.log(datosPersona1, 'en formulario 1')
                        
//     if(checkAgregarPersona.checked){
//         const botonEnviarOriginal = document.querySelector('.enviarFormulario');
//         botonEnviarOriginal.classList.toggle('enviarToggle');
//         formularioContenedor.after(nuevoFormulario);
                            
//         formulario2 = document.querySelector('#persona-2')
//         if(formulario2){
//             addEventFormulario2()
//         }
//     }
// });

// * Linea nueva para agregar formulario
const checkbox = document.querySelector('input[type="checkbox"]');
const formularioNuevo = document.querySelector('.formularioNuevo');

function agregarFormulario() {
    formularioNuevo.innerHTML = `
        <label for="nombre">Nombre</label>
        <input id="nombre" type="text" name="nombre">
        <label for="apellido">Apellidos</label>
        <input id="apellido" type="text" name="apellido">
        <label for="documento">N° de documento</label>
        <input id="documento" type="number" name="documento" min="6">
        <label for="fechaNacimiento">Fecha de Nacimiento</label>
        <input id="fechaNacimiento" type="date" name="fechaNacimiento">
        <label for="destino">Lugar de destino</label>
        <input id="destino" type="text" name="destino">
        <div class="formularioBotones">
            <input type="submit" class="enviarFormulario" value="Enviar">
        </div>
        <div class="codigoGenerado inputVacio"></div>
    `;
    formularioNuevo.classList.add('formularioContenedor');
}

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        agregarFormulario();
    } else {
        formularioNuevo.innerHTML = '';
        formularioNuevo.classList.remove('formularioContenedor');
    }
});

const formOriginal = document.querySelector('.formularioContenedor');
formOriginal.addEventListener('submit', (event) => {
    event.preventDefault();
});

function generarCodigoAleatorio() {
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const caracteres = numeros.concat(letras); 
    let codigo = "";
    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indice];
    }
    return codigo;
}

let ultimoCodigoGenerado = '';
let ultimoFormularioDatos = '';

// ! Linea vieja para capturar los datos
// function enviarDatosFormularios() {
//     const formularios = document.querySelectorAll('form');
//     let todosLosDatos = [];
//     let formularioVacio = false;

//     formularios.forEach(formulario => {
//         const inputs = formulario.querySelectorAll('input');
//         let formularioDatos = {};

//         inputs.forEach(input => {
//         if (input.value.trim() === '') {
//                 formularioVacio = true;
//             }
//             formularioDatos[input.name] = input.value.trim();
//         });

// todosLosDatos.push(formularioDatos)
// });

// return { todosLosDatos, formularioVacio };
// }

// * Linea nueva para capturar los datos

function enviarDatosFormularios() {
    const formularios = document.querySelectorAll('form');
    let todosLosDatos = [];
    let formularioVacio = false;

    formularios.forEach(formulario => {
        const formData = new FormData(formulario);
        let formularioDatos = {};

        for (let [name, value] of formData.entries()) {
            if (value.trim() === '') {
                formularioVacio = true;
            }
            formularioDatos[name] = value.trim();
        }

        todosLosDatos.push(formularioDatos);
    });

    return { todosLosDatos, formularioVacio };
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('enviarFormulario')) {
        event.preventDefault();

        const { todosLosDatos, formularioVacio } = enviarDatosFormularios();

        if (!formularioVacio) {
            const codigoAleatorio = generarCodigoAleatorio();

            const formularios = document.querySelectorAll('form');
            formularios.forEach(formulario => {
                const codigoGenerado = formulario.querySelector('.codigoGenerado');
                codigoGenerado.innerHTML = `El código generado es: ${codigoAleatorio}`;
            });

            console.log(todosLosDatos);

// * Enviar datos al archivo datosFormulario.js
            localStorage.setItem('datosFormulario', JSON.stringify(todosLosDatos));
        } else {
            const formulario = event.target.closest('form');
            const inputVacio = formulario.querySelector('.inputVacio');
            inputVacio.innerHTML = `Por favor, complete todos los campos`;
            inputVacio.classList.toggle('error', true);
        }
    }
});