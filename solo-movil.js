// solo-movil.js - Escalado móvil con margen de respiro seguro para ver menús y descripciones
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

    // 4. Función con factor de respiro para asegurar visibilidad total
    function ajustarPantallaMovilConRespiro() {
        const wrapper = document.querySelector('.mobile-respiro-wrapper');
        const container = document.getElementById('scaledMobileContainer') || document.querySelector('.tv-screen-container');
        if (!wrapper || !container) return;

        // Obtener el ancho y alto visible real ignorando barras flotantes
        const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        const offsetTop = window.visualViewport ? window.visualViewport.offsetTop : 0;
        const offsetLeft = window.visualViewport ? window.visualViewport.offsetLeft : 0;

        wrapper.style.width = vw + 'px';
        wrapper.style.height = vh + 'px';
        wrapper.style.top = offsetTop + 'px';
        wrapper.style.left = offsetLeft + 'px';

        const baseWidth = 1366;
        const baseHeight = 768;

        const scaleX = vw / baseWidth;
        const scaleY = vh / baseHeight;
        
        // Multiplicamos por 0.82 para garantizar un margen de respiro perfecto por los 4 lados
        const scale = Math.min(scaleX, scaleY) * 0.82;

        // Aplicar transformación centrada
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', ajustarPantallaMovilConRespiro);
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', ajustarPantallaMovilConRespiro);
        window.visualViewport.addEventListener('scroll', ajustarPantallaMovilConRespiro);
    }

    window.addEventListener('orientationchange', () => {
        setTimeout(ajustarPantallaMovilConRespiro, 300);
    });

    ajustarPantallaMovilConRespiro();
});