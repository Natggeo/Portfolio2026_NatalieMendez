// solo-movil.js - Versión definitiva basada en el prototipo para visibilidad total sin recortes
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección estricta de dispositivos móviles
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si es PC, el script no hace nada y tu versión de computadora se queda 100% intacta
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos para bloquear el scroll y fijar el entorno móvil horizontal
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

        /* Contenedor principal que abarca toda la ventana móvil */
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

        /* Consola base de 1366x768 centrada milimétricamente */
        .tv-screen-container {
            width: 1366px !important;
            height: 768px !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform-origin: center center !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Envolver automáticamente el televisor si no está envuelto
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('mobile-forced-landscape')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-forced-landscape';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledForcedContainer';
    }

    // 4. Función de escala adaptada al área visual real del celular (evitando que las barras del navegador corten la descripción)
    function ajustarPrototipoMovil() {
        const container = document.getElementById('scaledForcedContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;

        // Obtenemos el ancho y alto real disponible ignorando las barras flotantes del navegador
        const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        const anchoVentana = Math.max(vw, vh);
        const altoVentana = Math.min(vw, vh);

        const baseWidth = 1366;
        const baseHeight = 768;

        const scaleX = anchoVentana / baseWidth;
        const scaleY = altoVentana / baseHeight;
        
        // Usamos Math.min para garantizar que quepa todo por completo, 
        // multiplicando por 0.88 para dejar un margen seguro que evita que la descripción inferior se oculte
        const scale = Math.min(scaleX, scaleY) * 0.88;

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // Escuchamos cambios de tamaño y rotación
    window.addEventListener('resize', ajustarPrototipoMovil);
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', ajustarPrototipoMovil);
        window.visualViewport.addEventListener('scroll', ajustarPrototipoMovil);
    }

    window.addEventListener('orientationchange', () => {
        setTimeout(ajustarPrototipoMovil, 300);
    });

    ajustarPrototipoMovil();
});
