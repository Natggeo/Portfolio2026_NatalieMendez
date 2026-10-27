// solo-movil.js - Escalado móvil optimizado con Flexbox y margen de respiro sin cortes
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección de dispositivos móviles o pantallas reducidas
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si es PC, el script se detiene y la PC se queda 100% intacta
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos limpios basados en Flexbox para evitar desfases
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

        /* Contenedor principal que centra y da el margen de respiro */
        .mobile-respiro-wrapper {
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
            box-sizing: border-box !important;
            padding: 20px !important; /* Margen de respiro seguro alrededor de todo el televisor */
        }

        /* Lienzo base de la consola sin posiciones absolutas problemáticas */
        .tv-screen-container {
            width: 1366px !important;
            height: 768px !important;
            flex-shrink: 0 !important;
            transform-origin: center center !important;
            box-sizing: border-box !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Envolver automáticamente el televisor en el contenedor móvil
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('mobile-respiro-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-respiro-wrapper';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledMobileContainer';
    }

    // 4. Función de escala matemática precisa basada en el área útil con respiro
    function escalarMovilSinCortes() {
        const container = document.getElementById('scaledMobileContainer') || document.querySelector('.tv-screen-container');
        if (!container) return;
        
        const baseWidth = 1366;
        const baseHeight = 768;

        // Obtenemos el tamaño visible real del visor del celular
        const windowWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const windowHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        // Restamos el espacio del padding de respiro (40px en total por eje)
        const availableWidth = windowWidth - 40;
        const availableHeight = windowHeight - 40;

        const scaleX = availableWidth / baseWidth;
        const scaleY = availableHeight / baseHeight;
        
        // Tomamos la escala menor para asegurar que encaje tanto de ancho como de alto perfectamente
        const scale = Math.min(scaleX, scaleY);

        // Aplicamos la escala directa sin desfasar coordenadas
        container.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', escalarMovilSinCortes);
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', escalarMovilSinCortes);
        window.visualViewport.addEventListener('scroll', escalarMovilSinCortes);
    }

    window.addEventListener('orientationchange', () => {
        setTimeout(escalarMovilSinCortes, 350); // Pausa para permitir que el celular complete la rotación
    });

    escalarMovilSinCortes();
});