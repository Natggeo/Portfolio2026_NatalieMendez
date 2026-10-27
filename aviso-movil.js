// escalador-global.js - Activa el escalado horizontal EXCLUSIVAMENTE en móviles
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detectar si es un dispositivo móvil
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si estás en PC, el script se detiene aquí y la versión de PC queda 100% intacta y original
    if (!esMovil) {
        return; 
    }

    // 2. Si es móvil, inyectamos los estilos de transformación y contenedor exclusivo para celulares
    const style = document.createElement('style');
    style.innerHTML = `
        html, body {
            background-color: #000 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
        }

        .scaler-wrapper {
            width: 100vw !important;
            height: 100vh !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            overflow: hidden !important;
            background-color: #000 !important;
            z-index: 9999;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
        }

        /* Forzar dimensiones de consola fija SOLAMENTE en móviles */
        .tv-screen-container {
            width: 1366px !important;
            height: 768px !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform-origin: center center !important;
            box-sizing: border-box !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Envolver el televisor en el contenedor móvil
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('scaler-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'scaler-wrapper';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledContainer';
    }

    // 4. Función de escalado optimizada para celulares
    function escalarSitioMovil() {
        const container = document.getElementById('scaledContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;
        
        const baseWidth = 1366;
        const baseHeight = 768;

        const windowWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const windowHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        
        // Margen de respiro para móviles
        let scale = Math.min(scaleX, scaleY) * 0.92; 

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', escalarSitioMovil);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', escalarSitioMovil);
        window.visualViewport.addEventListener('scroll', escalarSitioMovil);
    }
    window.addEventListener('orientationchange', () => setTimeout(escalarSitioMovil, 300));
    escalarSitioMovil();
});
