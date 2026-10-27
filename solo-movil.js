// solo-movil.js - Escalado interactivo perfecto para móviles (respeta clics, videos y mantiene la consola intacta)
(function() {
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    if (!esMovil) {
        return; 
    }

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

        /* Contenedor envolvente centrado */
        .mobile-forced-landscape {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
            background-color: #000 !important;
            z-index: 99999;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            pointer-events: auto !important;
        }

        /* Consola base fija de 1366x768 que mantiene tu diseño original exacto */
        .tv-screen-container {
            width: 1366px !important;
            height: 768px !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform-origin: center center !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            pointer-events: auto !important;
        }

        /* Asegurar que los videos e iframes se rendericen perfectamente */
        video, iframe, embed, object {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);

    function inicializarEscalaInteractiva() {
        let tvContainer = document.querySelector('.tv-screen-container');
        if (!tvContainer) return;

        if (!tvContainer.parentElement.classList.contains('mobile-forced-landscape')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-forced-landscape';
            tvContainer.parentNode.insertBefore(wrapper, tvContainer);
            wrapper.appendChild(tvContainer);
            tvContainer.id = 'scaledForcedContainer';
        }

        const container = document.getElementById('scaledForcedContainer') || tvContainer;

        const realWidth = window.innerWidth;
        const realHeight = window.innerHeight;

        const anchoVentana = Math.max(realWidth, realHeight);
        const altoVentana = Math.min(realWidth, realHeight);

        const baseWidth = 1366;
        const baseHeight = 768;

        const scaleX = anchoVentana / baseWidth;
        const scaleY = altoVentana / baseHeight;
        
        // Usamos Math.min con un factor de 0.80 para que la televisión completa (con su menú arriba y descripción abajo) 
        // quepa de un solo vistazo con un margen limpio alrededor, permitiendo ver los videos y tocar los botones sin fallo.
        const scale = Math.min(scaleX, scaleY) * 0.80;

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarEscalaInteractiva);
    } else {
        inicializarEscalaInteractiva();
    }

    window.addEventListener('resize', inicializarEscalaInteractiva);
    window.addEventListener('orientationchange', () => {
        setTimeout(inicializarEscalaInteractiva, 400);
    });
})();
