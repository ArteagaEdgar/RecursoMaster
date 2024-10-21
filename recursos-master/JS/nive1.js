 // Función para formatear las fechas en "Mes Año"
function formatearFecha(fecha) {
    const [dia, mes, año] = fecha.split('/'); // Dividir la fecha en partes
    const fechaObj = new Date(año, mes - 1, dia); // Crear objeto de fecha (mes - 1 porque los meses son indexados desde 0)
    const opciones = { year: 'numeric', month: 'short' }; // Opciones de formateo
    return fechaObj.toLocaleString('es-ES', opciones); // Retornar la fecha formateada
}

// Función para actualizar dinámicamente el currículum
function updatePreview() {
    document.getElementById('previewNombreCompleto').textContent = `${document.getElementById('nombre').value} ${document.getElementById('apellidos').value}`;
    document.getElementById('previewTitulo').textContent = document.getElementById('titulo').value;
    document.getElementById('previewCorreo').textContent = document.getElementById('correo').value;
    document.getElementById('previewTelefono').textContent = document.getElementById('telefono').value;
    document.getElementById('previewDireccion').textContent = document.getElementById('direccion').value;
    document.getElementById('datepreview').textContent = document.getElementById('fechaNacimiento').value ? new Date(document.getElementById('fechaNacimiento').value).toLocaleDateString('es-ES') : '';
    document.getElementById('previewCompetencia').textContent = document.getElementById('habilidad').value;
    document.getElementById('previewIdioma').textContent = document.getElementById('idioma').value;
    document.getElementById('previewPasatiempos').textContent = document.getElementById('pasatiempos_').value;
    document.getElementById('previewPerfil').textContent = document.getElementById('descripcionPerfil').value;
    document.getElementById('previewFormacion').textContent = document.getElementById('formacionInput').value;
    document.getElementById('previewInstitucion').textContent = document.getElementById('institucion').value;
    document.getElementById('previewDescripcionFormacion').textContent = document.getElementById('descripcionFormacion').value;
    // Actualiza la vista de previsualización con fechas formateadas
document.getElementById('previewFechasFormacion').textContent = `${formatearFecha(document.getElementById('fechaInicio').value)} - ${formatearFecha(document.getElementById('fechaFin').value)}`;


    document.getElementById('previewPuesto').textContent = document.getElementById('puesto').value;
    document.getElementById('previewEmpleador').textContent = document.getElementById('empleador').value;
    document.getElementById('previewDescripcionExperiencia').textContent = document.getElementById('descripcionExperiencia').value;

// Actualiza la vista de previsualización con fechas formateadas para la experiencia
document.getElementById('previewFechasExperiencia').textContent = `${formatearFecha(document.getElementById('fechaInicioExperiencia').value)} - ${formatearFecha(document.getElementById('fechaFinExperiencia').value)}`;
}


// Método independiente para corregir la ortografía de todos los campos del formulario y mostrar errores en una ventana emergente
async function corregirOrtografiaForm() {
    const campos = [
        'nombre', 'apellidos', 'titulo', 'correo', 'telefono', 'direccion',
        'fechaNacimiento', 'habilidad', 'idioma', 'pasatiempos_',
        'descripcionPerfil', 'formacionInput', 'institucion', 'descripcionFormacion',
        'fechaInicio', 'fechaFin', 'puesto', 'empleador', 'descripcionExperiencia',
        'fechaInicioExperiencia', 'fechaFinExperiencia'
    ];


        let erroresTotales = []; // Almacenar todos los errores encontrados

        for (const campo of campos) {
            const elemento = document.getElementById(campo);
            if (elemento && elemento.value.trim()) {
                const erroresOrtografia = await revisarOrtografia(elemento.value);
    
                if (erroresOrtografia.length > 0) {
                    // Añadir los errores encontrados al arreglo
                    erroresOrtografia.forEach(error => {
                        erroresTotales.push({
                            campo: campo,
                            mensaje: error.message,
                            sugerencias: error.replacements.map(rep => rep.value).join(', ')
                        });
                    });
                }
            }
        }
    
        if (erroresTotales.length > 0) {
            mostrarErrores(erroresTotales);
        } else {
            mostrarMensajeExito(); // Mostrar un mensaje de éxito si no hay errores
        }
    }

   


// Método para revisar la ortografía usando LanguageTool
async function revisarOrtografia(texto) {
    const url = 'https://api.languagetool.org/v2/check';
    const params = new URLSearchParams();
    params.append('text', texto);
    params.append('language', 'es'); // Usar el idioma español

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });
        
        const data = await response.json();
        return data.matches; // Retornar las coincidencias encontradas
    } catch (error) {
        console.error('Error al revisar la ortografía:', error);
        return []; // Retornar un array vacío en caso de error
    }
}

// Función para mostrar los errores en una ventana emergente (modal)
function mostrarErrores(errores) {
    const modal = document.createElement('div');
    modal.id = 'modalErrores';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Errores Ortográficos</h2>
            <ul>
                ${errores.map(error => `
                    <li><strong>Campo:</strong> ${error.campo} <br>
                    <strong>Error:</strong> ${error.mensaje} <br>
                    <strong>Sugerencias:</strong> ${error.sugerencias}</li>
                `).join('')}
            </ul>
            <button id="cerrarModal">Cerrar</button>
        </div>
    `;

    document.body.appendChild(modal);

    
    // Añadir evento para cerrar el modal
    document.getElementById('cerrarModal').addEventListener('click', () => {
        document.getElementById('modalErrores').remove();
    });

    // Aplicar estilo al modal
    aplicarEstiloModal();
}

// Función para mostrar un mensaje de éxito si no hay errores
function mostrarMensajeExito() {
    const modal = document.createElement('div');
    modal.id = 'modalExito';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>¡Todo correcto!</h2>
            <p>No se encontraron errores ortográficos.</p>
            <button id="cerrarModalExito">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Añadir evento para cerrar el modal
    document.getElementById('cerrarModalExito').addEventListener('click', () => {
        document.getElementById('modalExito').remove();
    });

    // aca le quitare el disabled al boton de completar nivel 
    document.getElementById("complete-level-button").disabled = false;
    document.getElementById("btn_corre").disabled=true;

    // Aplicar estilo al modal
    aplicarEstiloModal();
}

// Función para aplicar el estilo al modal
function aplicarEstiloModal() {
    const style = document.createElement('style');
    style.innerHTML = `
        #modalErrores, #modalExito {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
            text-align: center;
            color: #333;
            font-family: Arial, sans-serif;
        }
        h2 {
            color: #ff5722;
            margin-bottom: 20px;
        }
        ul {
            text-align: left;
            margin-bottom: 20px;
        }
        li {
            margin-bottom: 10px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    `;
    document.head.appendChild(style);
}
