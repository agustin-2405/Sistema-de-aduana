document.querySelector('.formularioContenedor').addEventListener('submit' , function (event) {
    event.preventDefault()
    const datosFormulario = {
        nombre: document.querySelector('#nombre').value,
        apellido: document.querySelector('#apellido').value,
        documento: document.querySelector('#documento').value,
        fechaNacimiento: document.querySelector('#fechaNacimiento').value,
        destino: document.querySelector('#destino').value
    };
    let datosGuardados = JSON.parse(localStorage.getItem('datosFormulario')) || [];
    datosGuardados.push(datosFormulario);
    localStorage.setItem('datosFormulario', JSON.stringify(datosGuardados));
    crearTablaDatos([datosFormulario]);
});

document.addEventListener('DOMContentLoaded', function() {
    const datosFormulario = JSON.parse(localStorage.getItem('datosFormulario'));
    if (datosFormulario) {
        crearTablaDatos(datosFormulario);
    }
});

function crearTablaDatos(datos) {
    const tabla = document.querySelector('#tablaDatos tbody');
    datos.forEach(dato => {
        const fila = tabla.insertRow();
        const celdaNombre = fila.insertCell();
        const celdaApellido = fila.insertCell();
        const celdaDocumento = fila.insertCell();
        const celdaFechaNacimiento = fila.insertCell();
        const celdaDestino = fila.insertCell();

        celdaNombre.textContent = dato.nombre;
        celdaApellido.textContent = dato.apellido;
        celdaDocumento.textContent = dato.documento;
        celdaFechaNacimiento.textContent = dato.fechaNacimiento;
        celdaDestino.textContent = dato.destino;
    });
}