// escalador-global.js - Escalado automático horizontal adaptado al área real del visor móvil
document.addEventListener("DOMContentLoaded", function() {
    // 1. Inyectar estilos base para bloquear cualquier scroll o desbordamiento
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

        /* Lienzo base de PC mantenido exactamente en el centro */
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

    // 2. Envolver automáticamente el televisor si no está envuelto
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('scaler-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'scaler-wrapper';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledContainer';
    }

    // 3. Función matemática basada en el viewport visual real del navegador
    function escalarSitio() {
        const container = document.getElementById('scaledContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;
        
        const baseWidth = 1366;
        const baseHeight = 768;

        // Detectar el ancho y alto real visible ignorando las barras flotantes del celular
        const windowWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const windowHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        
        let scale = Math.min(scaleX, scaleY);

        // Margen de respiro extra para pantallas móviles o tablets pequeñas
        if (windowWidth <= 900 || windowHeight <= 600) {
            scale = scale * 0.88; // Reduce un poco más para que respire por completo
        }

        // Centrado absoluto y aplicación de escala limpia
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', escalarSitio);
    
    // Escuchar cambios del visor móvil (cuando aparecen/desaparecen las barras del navegador)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', escalarSitio);
        window.visualViewport.addEventListener('scroll', escalarSitio);
    }

    window.addEventListener('orientationchange', () => {
        setTimeout(escalarSitio, 300); // Pausa para que el celular termine de rotar fluidamente
    });
    
    window.addEventListener('load', escalarSitio);
    escalarSitio();
});
