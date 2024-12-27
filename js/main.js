const formularioContenedor = document.querySelector('.formularioContenedor');
const botonAgregarPersona = document.querySelector('.agregarPersona');

botonAgregarPersona.addEventListener('click', () => {
    const nuevoFormulario = document.createElement('form');
    nuevoFormulario.classList.add('formularioContenedor');
    nuevoFormulario.innerHTML = `
                            <label for="nombre">Nombre</label>
                            <input type="text" name="nombre" required><br>
                            <label for="apellido">Apellidos</label>
                            <input type="text" name="apellido" required><br>
                            <label for="documento">N° de documento</label>
                            <input type="number" name="documento" required><br>
                            <label for="fechaNacimiento">Fecha de Nacimiento</label>
                            <input type="date" name="fechaNacimiento" required><br>
                            <label for="destino">Lugar de destino</label>
                            <input type="text" name="destino" required>
                            <input type="submit" class="agregarPersona" value="Agregar Persona"></input>
                            <button>Enviar</button>
                            `;

    formularioContenedor.after(nuevoFormulario);
});