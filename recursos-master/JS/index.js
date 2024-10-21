document.addEventListener('DOMContentLoaded', () => {
    const levels = document.querySelectorAll('.timeline-item');
    const progress = document.getElementById('progress');
    const congratulationsMessage = document.getElementById('congratulations-message');
    let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;

    // Muestra los niveles desbloqueados
    levels.forEach((level, index) => {
        if (index < currentLevel) {
            level.classList.remove('locked');
        }
    });

    // Itera sobre cada nivel y agrega un evento de clic
    levels.forEach((level, index) => {
        level.addEventListener('click', () => {
            if (index + 1 === currentLevel) {
                alert(`Iniciando Nivel ${currentLevel}: ${level.querySelector('p').textContent}`);
                window.location.href = `nivel${index + 1}.html`;
            } else {
                alert('Debes completar los niveles anteriores primero.');
            }
        });
    });

    function completeLevel() {
        if (currentLevel < levels.length) {
            currentLevel++;
            localStorage.setItem('currentLevel', currentLevel);
            updateProgress();

            if (currentLevel === levels.length) { // Muestra el mensaje de felicitaciones al completar el último nivel
                congratulationsMessage.style.display = 'block';
                levels.forEach(level => {
                    level.classList.add('locked');
                });
            }
        }
    }

    function updateProgress() {
        const progressPercentage = (currentLevel - 1) / (levels.length - 1) * 80;
        progress.style.width = `${progressPercentage}%`;
    }

    if (!localStorage.getItem('currentLevel')) {
        localStorage.setItem('currentLevel', 1);
    } else {
        updateProgress();
    }

    const resetButton = document.getElementById('reset-progress-button');
    resetButton.addEventListener('click', showResetModal);

    function showResetModal() {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.transition = 'opacity 0.3s ease';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#282c34';
        modalContent.style.padding = '30px'; // Aumentado para un tamaño más grande
        modalContent.style.borderRadius = '10px';
        modalContent.style.textAlign = 'center';
        modalContent.style.width = '400px'; // Ancho ajustado
        modalContent.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        modalContent.style.animation = 'slideIn 0.5s ease';

        const modalText = document.createElement('p');
        modalText.textContent = '¿Eliminar progreso?';
        modalText.style.color = 'white';

        // Agregar un icono de advertencia
        const warningIcon = document.createElement('i');
        warningIcon.className = 'fas fa-exclamation-triangle';
        warningIcon.style.color = '#ffcc00';
        warningIcon.style.fontSize = '40px'; // Tamaño del icono
        modalText.prepend(warningIcon);
        modalText.style.display = 'flex';
        modalText.style.alignItems = 'center';
        modalText.style.justifyContent = 'center';
        modalText.style.gap = '10px'; // Espacio entre el icono y el texto

        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Aceptar';
        acceptButton.style.margin = '10px';
        acceptButton.style.padding = '10px 20px';
        acceptButton.style.border = 'none';
        acceptButton.style.borderRadius = '5px';
        acceptButton.style.backgroundColor = '#ff4444';
        acceptButton.style.color = 'white';
        acceptButton.style.cursor = 'pointer';
        acceptButton.style.transition = 'background-color 0.3s ease';

        acceptButton.addEventListener('mouseover', () => {
            acceptButton.style.backgroundColor = '#ff0000';
        });

        acceptButton.addEventListener('mouseout', () => {
            acceptButton.style.backgroundColor = '#ff4444';
        });

        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continuar';
        continueButton.style.margin = '10px';
        continueButton.style.padding = '10px 20px';
        continueButton.style.border = 'none';
        continueButton.style.borderRadius = '5px';
        continueButton.style.backgroundColor = '#6c757d';
        continueButton.style.color = 'white';
        continueButton.style.cursor = 'pointer';
        continueButton.style.transition = 'background-color 0.3s ease';

        continueButton.addEventListener('mouseover', () => {
            continueButton.style.backgroundColor = '#5a6268';
        });

        continueButton.addEventListener('mouseout', () => {
            continueButton.style.backgroundColor = '#6c757d';
        });

        modalContent.appendChild(modalText);
        modalContent.appendChild(acceptButton);
        modalContent.appendChild(continueButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        acceptButton.addEventListener('click', () => {
            localStorage.removeItem('currentLevel');
            currentLevel = 1;
            updateProgress();
            congratulationsMessage.style.display = 'none';
            alert('Progreso eliminado. El juego ha sido reiniciado.');
            window.location.reload();
        });

        continueButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
});

// Agregar animaciones CSS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
}
`;
document.head.appendChild(style);
