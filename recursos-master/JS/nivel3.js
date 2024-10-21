document.getElementById('compensation-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const employeeType = document.getElementById('employee-type').value;
    const baseSalary = parseInt(document.getElementById('base-salary').value);
    const bonus = parseInt(document.getElementById('bonus').value);
    const healthBenefits = document.getElementById('health-benefits').value;
    const otherIncentives = document.getElementById('other-incentives').value;

    // Evaluación del paquete de compensación
    const score = evaluateCompensationPackage(baseSalary, bonus, employeeType);

    // Mostrar resultado
    showResultModal(score, employeeType, healthBenefits, otherIncentives);
});

function evaluateCompensationPackage(baseSalary, bonus, employeeType) {
    let score = 0;

    // Lógica de evaluación basada en el tipo de empleado
    if (employeeType === "full-time") {
        if (baseSalary >= 50000 && bonus >= 5000) score += 10;
        else if (baseSalary >= 40000) score += 7;
        else score += 4;
    } else if (employeeType === "part-time") {
        if (baseSalary >= 25) score += 8; // $25 por hora
        else score += 5;
    } else if (employeeType === "contractor") {
        if (baseSalary >= 30 && bonus > 0) score += 9; // $30 por hora con bonificación
        else score += 6;
    }

    return score;
}

function showResultModal(score, employeeType, healthBenefits, otherIncentives) {
    const modal = document.getElementById('modal');
    const modalResultDescription = document.getElementById('modal-result-description');
    const modalAdditionalFeedback = document.getElementById('modal-additional-feedback');

    modalResultDescription.textContent = `Puntuación obtenida: ${score}/10. Paquete para ${employeeType}.`;
    modalAdditionalFeedback.innerHTML = `<p>Beneficios de Salud: ${healthBenefits || 'N/A'}</p><p>Otros Incentivos: ${otherIncentives || 'N/A'}</p>`;

    // Mostrar el modal de resultados
    modal.style.display = 'block';

    // Verificar si se completa el nivel o si se necesita reintentar
    if (score >= 8) {
        document.getElementById('complete-level-button').style.display = 'block'; // Mostrar botón
    } else {
        setTimeout(showErrorModal, 2000); // Mostrar el modal de error después de 2 segundos
    }
}

function showErrorModal() {
    const errorModal = document.getElementById('modal');
    errorModal.style.display = 'block';
    document.getElementById('modal-result-description').textContent = "Tu diseño de compensación necesita mejoras. Intenta nuevamente.";
}

function retryLevel() {
    // Recargar la página para intentar nuevamente
    location.reload();
}

// Cerrar los modales al hacer clic en la 'X'
document.getElementById('close-modal').onclick = function () {
    document.getElementById('modal').style.display = 'none';
};