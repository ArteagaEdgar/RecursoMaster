function evaluarPlan() {
    const area = document.getElementById('area').value;
    const plan = document.getElementById('plan').value.trim();
    const resultado = document.getElementById('resultado').value.trim();
    const evaluationResult = document.getElementById('evaluationResult');
    const scoreText = document.getElementById('score');

    if (plan === "" || resultado === "") {
        alert("Por favor, completa todos los campos antes de evaluar.");
        return;
    }

    // Simular una evaluación del plan
    let score = 0;
    if (plan.length > 50 && resultado.length > 50) {
        score = Math.floor(Math.random() * 20) + 80; // Calificación entre 80 y 100
    } else if (plan.length > 20 && resultado.length > 20) {
        score = Math.floor(Math.random() * 30) + 50; // Calificación entre 50 y 80
    } else {
        score = Math.floor(Math.random() * 30) + 20; // Calificación entre 20 y 50
    }

    // Mostrar resultado de la evaluación
    evaluationResult.classList.remove("hidden");
    scoreText.textContent = `Tu plan ha sido evaluado con un puntaje de ${score}/100.`;

    // Si el puntaje es alto, mostrar un mensaje de éxito
    if (score >= 80) {
        scoreText.style.color = "#27ae60"; // Verde
    } else if (score >= 50) {
        scoreText.style.color = "#f1c40f"; // Amarillo
    } else {
        scoreText.style.color = "#e74c3c"; // Rojo
    }
}
