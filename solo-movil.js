// solo-movil.js - Escalado máximo horizontal sin marcos negros y con visibilidad total de descripción y menú
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección estricta de dispositivos móviles
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si es PC, el script no hace nada y tu versión de computadora se queda 100% intacta
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos para pantalla completa horizontal y márgenes internos seguros
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

        /* Contenedor principal que cubre toda la pantalla móvil */
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

        /* Consola base de 1366x768 */
        .tv-screen-container {
            width: 1366px !important;
            height: 768px !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform-origin: center center !important;
            box-sizing: border-box !important;
            overflow: visible !important;
        }

        /* Regla de seguridad móvil para asegurar que la descripción y el menú nunca se salgan */
        .tv-screen-container header, 
        .tv-screen-container .menu-hamburguesa,
        .tv-screen-container [class*="menu"],
        .tv-screen-container [class*="nav"] {
            max-top: 15px !important;
        }

        .tv-screen-container footer, 
        .tv-screen-container [class*="descripcion"], 
        .tv-screen-container [class*="info"],
        .tv-screen-container [class*="detalle"] {
            margin-bottom: 15px !important;
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

    // 4. Función de escala basada en el ancho máximo para eliminar marcos negros
    function escalarMaximoHorizontal() {
        const container = document.getElementById('scaledForcedContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;

        const realWidth = window.innerWidth;
        const realHeight = window.innerHeight;

        const anchoVentana = Math.max(realWidth, realHeight);
        const altoVentana = Math.min(realWidth, realHeight);

        const baseWidth = 1366;
        const baseHeight = 768;

        // Escalamos tomando como prioridad absoluta el ancho de la pantalla del celular
        const scaleX = anchoVentana / baseWidth;
        const scaleY = altoVentana / baseHeight;
        
        // Usamos scaleX para asegurar que cubra todo el ancho sin dejar espacios negros a los lados
        // y aplicamos un factor equilibrado si la altura es muy reducida
        let scale = scaleX;
        
        // Si la altura escalada supera el alto real de la pantalla, ajustamos ligeramente para que la descripción quepa
        const alturaCalculada = baseHeight * scale;
        if (alturaCalculada > altoVentana) {
            scale = (altoVentana / baseHeight) * 1.05; // Ampliado al máximo posible manteniendo la descripción visible
        }

        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', escalarMaximoHorizontal);
    window.addEventListener('orientationchange', () => {
        setTimeout(escalarMaximoHorizontal, 300);
    });

    escalarMaximoHorizontal();
});
