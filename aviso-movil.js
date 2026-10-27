// escalador-global.js - Escalado automático horizontal con margen de respiro para móviles
document.addEventListener("DOMContentLoaded", function() {
    // 1. Inyectar estilos estrictos para bloquear scroll y desbordamientos
    const style = document.createElement('style');
    style.innerHTML = `
        html, body {
            background-color: #000 !important;
            width: 100vw !important;
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
            height: 100dvh !important;
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

    // 3. Función matemática de escalado con margen de respiro para móviles
    function escalarSitio() {
        const container = document.getElementById('scaledContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;
        
        const baseWidth = 1366;
        const baseHeight = 768;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        
        let scale = Math.min(scaleX, scaleY);

        // Si es una pantalla pequeña (móvil), aplicamos el factor de reducción para dar margen
        if (windowWidth <= 900) {
            scale = scale * 0.92; // 0.92 deja un margen de respiro perfecto y evita cortes
        }

        // Centrado absoluto + escala ajustada
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', escalarSitio);
    window.addEventListener('orientationchange', () => {
        setTimeout(escalarSitio, 200); // Pequeño respiro para que el navegador recalcule el giro
    });
    window.addEventListener('load', escalarSitio);
    
    escalarSitio();
});