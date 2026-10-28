// solo-movil.js - Prueba de escala reducida para encontrar el tamaño perfecto sin recortes
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
        }

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

    function inicializarModoMovil() {
        let tvContainer = document.querySelector('.tv-screen-container');
        
        if (!tvContainer) {
            setTimeout(inicializarModoMovil, 50);
            return;
        }

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
        
        // PROBAMOS ESCALA MÁS PEQUEÑA (0.72) para ver la televisión completa con margen alrededor
        const scale = Math.min(scaleX, scaleY) * 0.72;

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarModoMovil);
    } else {
        inicializarModoMovil();
    }

    window.addEventListener('resize', inicializarModoMovil);
    window.addEventListener('orientationchange', () => {
        setTimeout(inicializarModoMovil, 400);
    });
})();