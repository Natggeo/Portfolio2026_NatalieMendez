// solo-movil.js - Adaptador exclusivo para dispositivos móviles con margen de respiro
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección estricta de dispositivo móvil o pantallas pequeñas
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si estás en una PC, el script se detiene por completo y la PC no sufre ningún cambio
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos específicos para móviles con un contenedor que deja "respirar" el diseño
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

        /* Envoltorio móvil con padding interno para dar el margen de respiro */
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
            padding: 15px !important; /* Margen de respiro para que respire por los 4 lados */
        }

        /* Forzar dimensiones de consola fija dentro del área segura móvil */
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

    // 3. Envolver automáticamente el televisor dentro del contenedor móvil
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('mobile-respiro-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-respiro-wrapper';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledMobileContainer';
    }

    // 4. Función de cálculo de escala con factor de reducción extra para el respiro
    function escalarMovilConRespiro() {
        const container = document.getElementById('scaledMobileContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;
        
        const baseWidth = 1366;
        const baseHeight = 768;

        const windowWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const windowHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        
        // Multiplicamos por 0.85 para asegurar que encaje holgadamente sin tocar los bordes de la pantalla
        let scale = Math.min(scaleX, scaleY) * 0.85; 

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', escalarMovilConRespiro);
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', escalarMovilConRespiro);
        window.visualViewport.addEventListener('scroll', escalarMovilConRespiro);
    }

    window.addEventListener('orientationchange', () => {
        setTimeout(escalarMovilConRespiro, 300);
    });

    escalarMovilConRespiro();
});