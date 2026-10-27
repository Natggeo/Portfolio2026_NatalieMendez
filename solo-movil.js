// solo-movil.js - Forzado horizontal y pantalla completa total sin marcos negros
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección estricta de dispositivos móviles
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si es PC, el script no hace nada y tu versión de computadora se queda 100% intacta
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos para pantalla completa absoluta en móvil
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

        /* Contenedor principal que llena toda la pantalla del móvil sin dejar huecos */
        .mobile-forced-landscape {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
            background-color: #000 !important;
            z-index: 9999;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
        }

        /* Consola base de 1366x768 centrada */
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
    if (tvContainer && !tvContainer.parentElement.classList.contains('mobile-forced-landscape')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-forced-landscape';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledForcedContainer';
    }

    // 4. Función de escala máxima (Cover) para eliminar los marcos negros por completo
    function escalarPantallaCompleta() {
        const container = document.getElementById('scaledForcedContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;

        // Forzar dimensiones virtuales horizontales estables
        const realWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const realHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        const anchoVentana = Math.max(realWidth, realHeight);
        const altoVentana = Math.min(realWidth, realHeight);

        const baseWidth = 1366;
        const baseHeight = 768;

        const scaleX = anchoVentana / baseWidth;
        const scaleY = altoVentana / baseHeight;
        
        // Usamos Math.max para que la pantalla cubra todo el espacio sin dejar marcos negros
        const scale = Math.max(scaleX, scaleY);

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', escalarPantallaCompleta);
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', escalarPantallaCompleta);
        window.visualViewport.addEventListener('scroll', escalarPantallaCompleta);
    }

    escalarPantallaCompleta();
});