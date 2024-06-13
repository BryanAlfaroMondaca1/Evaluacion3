// assets/js/script.js

import { registrarPersona, obtenerPersonas, actualizarPersona, eliminarPersona } from "./promesas.js";

// Funcionalidades de accesibilidad
function aumentarTamañoFuente() {
    document.body.style.fontSize = "larger";
}

function disminuirTamañoFuente() {
    document.body.style.fontSize = "smaller";
}

function alternarContraste() {
    document.body.classList.toggle("alto-contraste");
}

// Hacer las funciones accesibles globalmente
window.aumentarTamañoFuente = aumentarTamañoFuente;
window.disminuirTamañoFuente = disminuirTamañoFuente;
window.alternarContraste = alternarContraste;

window.addEventListener("load", () => {
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
    cargarDatos();
});

// Función para validar el formulario
const validarFormulario = () => {
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let ePais = document.getElementById("pais");
    let eAsunto = document.getElementById("asunto");
    let eCorreo = document.getElementById("correo");
    let eTelefono = document.getElementById("telefono");
    let eEdad = document.getElementById("edad");
    let eSuscripcion = document.getElementById("suscripcion");

    if (!eNombre.value.trim()) {
        alert("El nombre es requerido");
        return false;
    }
    if (!eApellido.value.trim()) {
        alert("El apellido es requerido");
        return false;
    }
    if (!ePais.value.trim()) {
        alert("El país es requerido");
        return false;
    }
    if (!eAsunto.value.trim()) {
        alert("El asunto es requerido");
        return false;
    }
    if (!eCorreo.value.trim() || !eCorreo.value.includes("@")) {
        alert("El correo electrónico es requerido y debe ser válido");
        return false;
    }
    if (!eTelefono.value.trim() || isNaN(eTelefono.value)) {
        alert("El teléfono es requerido y debe ser un número");
        return false;
    }
    if (!eEdad.value.trim() || isNaN(eEdad.value) || eEdad.value < 0) {
        alert("La edad es requerida y debe ser un número positivo");
        return false;
    }

    return true;
};

// Función para registrar una nueva persona
const registrar = () => {
    if (!validarFormulario()) {
        return;
    }

    // Recuperar elementos
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let ePais = document.getElementById("pais");
    let eAsunto = document.getElementById("asunto");
    let eCorreo = document.getElementById("correo");
    let eTelefono = document.getElementById("telefono");
    let eEdad = document.getElementById("edad");
    let eSuscripcion = document.getElementById("suscripcion");

    // Recuperar valores de los elementos
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vPais = ePais.value;
    let vAsunto = eAsunto.value;
    let vCorreo = eCorreo.value;
    let vTelefono = eTelefono.value;
    let vEdad = eEdad.value;
    let vSuscripcion = eSuscripcion.checked;

    // Crear un objeto con los datos recuperados
    let objeto = { nombre: vNombre, apellido: vApellido, pais: vPais, asunto: vAsunto, correo: vCorreo, telefono: vTelefono, edad: vEdad, suscripcion: vSuscripcion };

    // Enviar a una función que registra
    registrarPersona(objeto).then(() => {
        alert("Se registró exitosamente");
        cargarDatos();
        document.getElementById("miFormulario").reset();
    }).catch((error) => {
        console.log(error);
    });
};

// Función para cargar los datos desde Firestore y mostrarlos en la tabla
const cargarDatos = () => {
    obtenerPersonas().then((personas) => {
        let estructura = "";
        personas.forEach((p) => {
            estructura += "<tr>";
            estructura += "<td>" + p.nombre + "</td>";
            estructura += "<td>" + p.apellido + "</td>";
            estructura += "<td>" + p.pais + "</td>";
            estructura += "<td>" + p.asunto + "</td>";
            estructura += "<td>" + p.correo + "</td>";
            estructura += "<td>" + p.telefono + "</td>";
            estructura += "<td>" + p.edad + "</td>";
            estructura += "<td>" + (p.suscripcion ? "Sí" : "No") + "</td>";
            estructura += "<td><button id='UPD" + p.id + "'>Actualizar</button></td>";
            estructura += "<td><button id='DEL" + p.id + "'>Eliminar</button></td>";
            estructura += "</tr>";
        });
        document.getElementById("cuerpoTabla").innerHTML = estructura;

        personas.forEach((p) => {
            let elemento = document.getElementById("UPD" + p.id);
            elemento.addEventListener("click", () => {
                document.getElementById("nombre").value = p.nombre;
                document.getElementById("apellido").value = p.apellido;
                document.getElementById("pais").value = p.pais;
                document.getElementById("asunto").value = p.asunto;
                document.getElementById("correo").value = p.correo;
                document.getElementById("telefono").value = p.telefono;
                document.getElementById("edad").value = p.edad;
                document.getElementById("suscripcion").checked = p.suscripcion;
                document.getElementById("btnActualizar").value = p.id;
                document.getElementById("btnActualizar").disabled = false;
                document.getElementById("btnRegistrar").disabled = true;
            });

            let btnEliminar = document.getElementById("DEL" + p.id);
            btnEliminar.addEventListener("click", () => {
                if (confirm("Desea eliminar a:\n" + p.nombre + " " + p.apellido)) {
                    eliminarPersona(p.id).then(() => {
                        alert("Eliminaste con éxito");
                        cargarDatos();
                    }).catch((e) => {
                        console.log(e);
                    });
                } else {
                    console.log("Cancelaste la eliminación");
                }
            });
        });
    }).catch((error) => {
        console.log(error);
    });
};

// Función para actualizar una persona
const actualizar = () => {
    if (!validarFormulario()) {
        return;
    }

    // Recuperar elementos
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let ePais = document.getElementById("pais");
    let eAsunto = document.getElementById("asunto");
    let eCorreo = document.getElementById("correo");
    let eTelefono = document.getElementById("telefono");
    let eEdad = document.getElementById("edad");
    let eSuscripcion = document.getElementById("suscripcion");

    // Recuperar valores de los elementos
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vPais = ePais.value;
    let vAsunto = eAsunto.value;
    let vCorreo = eCorreo.value;
    let vTelefono = eTelefono.value;
    let vEdad = eEdad.value;
    let vSuscripcion = eSuscripcion.checked;

    // Crear un objeto con los datos recuperados
    let objeto = { nombre: vNombre, apellido: vApellido, pais: vPais, asunto: vAsunto, correo: vCorreo, telefono: vTelefono, edad: vEdad, suscripcion: vSuscripcion };

    // Obtener ID y enviar a la función que actualiza
    let id = document.getElementById("btnActualizar").value;

    actualizarPersona(objeto, id).then(() => {
        alert("Se actualizó con éxito");
        cargarDatos();
        document.getElementById("miFormulario").reset();
        document.getElementById("btnActualizar").value = "";
        document.getElementById("btnActualizar").disabled = true;
        document.getElementById("btnRegistrar").disabled = false;
    }).catch((e) => {
        console.log(e);
    });
};
