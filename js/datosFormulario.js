document.querySelector('.formularioContenedor').addEventListener('submit' , function (event) {
    event.preventDefault()
    crearTablaDatos()
})

function crearTablaDatos () {
    const nombre = document.querySelector('#nombre').value
    const apellido = document.querySelector('#apellido').value
    const documento = document.querySelector('#documento').value
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value
    const destino = document.querySelector('#destino').value

    const tabla = document.querySelector('#tablaDatos');
    const fila = tabla.insertRow();
    const celdaNombre = fila.insertCell();
    const celdaApellido = fila.insertCell();
    const celdaDocumento = fila.insertCell();
    const celdaFechaNacimiento = fila.insertCell();
    const celdaDestino = fila.insertCell();

    celdaNombre.textContent = nombre;
    celdaApellido.textContent = apellido;
    celdaDocumento.textContent = documento;
    celdaFechaNacimiento.textContent = fechaNacimiento;
    celdaDestino.textContent = destino;
}