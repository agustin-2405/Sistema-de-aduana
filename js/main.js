const formularioContenedor = document.querySelector('.formularioContenedor');
const botonAgregarPersona = document.querySelector('.agregarPersona');

botonAgregarPersona.addEventListener('click', () => {
    const nuevoFormulario = document.createElement('form');
    nuevoFormulario.classList.add('formularioContenedor');
    nuevoFormulario.innerHTML = `
                        <label for="nombre">Nombre</label>
                        <input type="text" name="nombre" required>
                        <label for="apellido">Apellidos</label>
                        <input type="text" name="apellido" required>
                        <label for="documento">N° de documento</label>
                        <input type="number" name="documento" required>
                        <label for="fechaNacimiento">Fecha de Nacimiento</label>
                        <input type="date" name="fechaNacimiento" required>
                        <label for="destino">Lugar de destino</label>
                        <input type="text" name="destino" required>
                        <div class="formularioBotones">
                            <input type="submit" class="enviarFormulario" value="Enviar">
                        </div>
                        <div class="codigoGenerado inputVacio"></div>
                            `;
    nuevoFormulario.classList.add('formularioNuevo')
    formularioContenedor.after(nuevoFormulario);

    const botonEnviarOriginal = document.querySelector('.enviarFormulario');
    botonEnviarOriginal.classList.toggle('enviarToggle');
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

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('enviarFormulario')) {
        event.preventDefault();

        const formulario = event.target.closest('form');
        const inputs = formulario.querySelectorAll('input');
        let formularioVacio = false;
        let formularioDatos = '';

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                formularioVacio = true;
            }
            formularioDatos += input.value.trim();
        });

        if (!formularioVacio) {
            if (formularioDatos !== ultimoFormularioDatos) {
                ultimoFormularioDatos = formularioDatos;
                ultimoCodigoGenerado = generarCodigoAleatorio();
            }
            const codigoGenerado = formulario.querySelector('.codigoGenerado');
            codigoGenerado.innerHTML = `El código generado es: ${ultimoCodigoGenerado}`;
        } else {
            const inputVacio = formulario.querySelector('.inputVacio');
            inputVacio.innerHTML = `Por favor, complete todos los campos`;
            inputVacio.classList.toggle('error', true);
        }

        const datosFormulario = {};
        inputs.forEach(input => {
            datosFormulario[input.name] = input.value.trim();
        });
        console.log(datosFormulario);

        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
    }
});
