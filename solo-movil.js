// solo-movil.js - Escalado móvil optimizado con mayor tamaño y margen de respiro equilibrado
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección estricta de dispositivos móviles
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si es PC, el script no hace nada y tu versión de computadora se queda 100% intacta
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos limpios con restricciones de desbordamiento
    const style = document.createElement('style');
    style.innerHTML = `
        html, body {
            background-color: #000 !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
        }

        /* Contenedor principal que centra la consola en el visor móvil */
        .mobile-respiro-wrapper {
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
            box-sizing: border-box !important;
        }

        /* Forzar tamaño base de la TV y bloquear desbordamientos internos */
        .tv-screen-container {
            width: 1366px !important;
            height: 768px !important;
            flex-shrink: 0 !important;
            overflow: hidden !important;
            transform-origin: center center !important;
            box-sizing: border-box !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Envolver automáticamente el televisor
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('mobile-respiro-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-respiro-wrapper';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledMobileContainer';
    }

    // 4. Función de cálculo de escala con un factor mayor (0.95) para aprovechar mejor la pantalla
    function escalarMovilMasGrande() {
        const container = document.getElementById('scaledMobileContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;
        
        const baseWidth = 1366;
        const baseHeight = 768;

        const windowWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const windowHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        
        // Subimos al 95% para que se vea más grande y detallado ocupando mejor el espacio
        const scale = Math.min(scaleX, scaleY) * 0.95;

        container.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', escalarMovilMasGrande);
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', escalarMovilMasGrande);
        window.visualViewport.addEventListener('scroll', escalarMovilMasGrande);
    }

    window.addEventListener('orientationchange', () => {
        setTimeout(escalarMovilMasGrande, 350);
    });

    escalarMovilMasGrande();
});