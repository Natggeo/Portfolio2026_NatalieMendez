// solo-movil.js - Ajuste exacto al área visual real del celular para visibilidad e interactividad total
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección estricta de dispositivos móviles
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si es PC, el script se detiene y tu versión de computadora se queda 100% intacta
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos base para fijar la capa móvil
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

        .mobile-respiro-wrapper {
            position: fixed !important;
            overflow: hidden !important;
            background-color: #000 !important;
            z-index: 9999;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
        }

        /* Lienzo base de la consola centrado de forma absoluta */
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

    // 3. Envolver automáticamente el televisor
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('mobile-respiro-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-respiro-wrapper';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledMobileContainer';
    }

    // 4. Función de ajuste milimétrico basada en el área visual real del dispositivo
    function ajustarPantallaMovil() {
        const wrapper = document.querySelector('.mobile-respiro-wrapper');
        const container = document.getElementById('scaledMobileContainer') || document.querySelector('.tv-screen-container');
        if (!wrapper || !container) return;

        // Obtener el ancho y alto visible real ignorando las barras flotantes del navegador móvil
        const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        const offsetTop = window.visualViewport ? window.visualViewport.offsetTop : 0;
        const offsetLeft = window.visualViewport ? window.visualViewport.offsetLeft : 0;

        // Forzar al envoltorio a ocupar exactamente el espacio útil visible
        wrapper.style.width = vw + 'px';
        wrapper.style.height = vh + 'px';
        wrapper.style.top = offsetTop + 'px';
        wrapper.style.left = offsetLeft + 'px';

        const baseWidth = 1366;
        const baseHeight = 768;

        const scaleX = vw / baseWidth;
        const scaleY = vh / baseHeight;
        
        // Calcular la escala exacta para que encaje de lado a lado y de arriba a abajo sin recortes
        const scale = Math.min(scaleX, scaleY);

        // Aplicar transformación centrada
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', ajustarPantallaMovil);
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', ajustarPantallaMovil);
        window.visualViewport.addEventListener('scroll', ajustarPantallaMovil);
    }

    window.addEventListener('orientationchange', () => {
        setTimeout(ajustarPantallaMovil, 300);
    });

    ajustarPantallaMovil();
});