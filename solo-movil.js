// solo-movil.js - Versión robusta para forzar horizontal y mostrar toda la interfaz sin pantallas negras
(function() {
    // 1. Detección estricta de dispositivos móviles
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    if (!esMovil) {
        return; // Si es PC, se queda 100% intacto
    }

    // 2. Inyectar estilos base seguros para evitar pantallas negras
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

    // 3. Función principal de escalado y estructuración
    function inicializarModoMovil() {
        let tvContainer = document.querySelector('.tv-screen-container');
        
        // Si el contenedor aún no ha cargado en el HTML, esperamos un instante y reintentamos
        if (!tvContainer) {
            setTimeout(inicializarModoMovil, 50);
            return;
        }

        // Envolver el televisor si no está envuelto todavía
        if (!tvContainer.parentElement.classList.contains('mobile-forced-landscape')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-forced-landscape';
            tvContainer.parentNode.insertBefore(wrapper, tvContainer);
            wrapper.appendChild(tvContainer);
            tvContainer.id = 'scaledForcedContainer';
        }

        const container = document.getElementById('scaledForcedContainer') || tvContainer;

        // Cálculo milimétrico para el modo horizontal forzado
        const realWidth = window.innerWidth;
        const realHeight = window.innerHeight;

        const anchoVentana = Math.max(realWidth, realHeight);
        const altoVentana = Math.min(realWidth, realHeight);

        const baseWidth = 1366;
        const baseHeight = 768;

        const scaleX = anchoVentana / baseWidth;
        const scaleY = altoVentana / baseHeight;
        
        // Usamos Math.min con un factor de 0.90 para garantizar que la pantalla, 
        // el menú de hamburguesa superior y la descripción inferior entren perfectamente a la vista
        const scale = Math.min(scaleX, scaleY) * 0.90;

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // Ejecutar cuando cargue el DOM o la ventana completa
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
