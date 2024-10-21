document.addEventListener('DOMContentLoaded', () => {
    const solutionButtons = document.querySelectorAll('.solution-button');
    const resultDiv = document.getElementById('result');
    const resultMessage = document.getElementById('result-message');
    const nextLevelButton = document.getElementById('next-level-button');

    solutionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedSolution = button.getAttribute('data-solution');
            evaluarSolucion(selectedSolution);
        });
    });

    nextLevelButton.addEventListener('click', () => {
        // Aquí puedes redirigir al siguiente nivel o hacer otra acción
        window.location.href = 'nivel3.html'; // Cambia esto al archivo del siguiente nivel
    });
});

function evaluarSolucion(solucion) {
    let mensaje;
    
    switch(solucion) {
        case '1':
            mensaje = "Hablar por separado puede ayudar, pero no resolverá el conflicto en su totalidad.";
            break;
        case '2':
            mensaje = "¡Buena elección! Organizar una reunión conjunta puede fomentar la comunicación y resolver el conflicto.";
            break;
        case '3':
            mensaje = "Ignorar el conflicto solo lo empeorará. Es importante abordarlo.";
            break;
        default:
            mensaje = "Opción no válida.";
    }
    
    mostrarResultado(mensaje);
}

function mostrarResultado(mensaje) {
    document.getElementById('result-message').textContent = mensaje;
    document.getElementById('result').style.display = 'block';
}
