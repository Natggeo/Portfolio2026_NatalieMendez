/* solo-movil.js - Ajuste de escala para dispositivos móviles */
(function() {
    const esMovil =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth <= 900;

    if (!esMovil) {
        return;
    }

    const style = document.createElement('style');
    style.innerHTML = `
        html, body {
            background-color: #000 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
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

        /* Ajustes del menú en móviles */
        .menu-overlay {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            padding: 10px !important;
            z-index: 100000 !important;
            box-sizing: border-box !important;
            overflow: auto !important;
        }

        /* Menú más pequeño, inspirado en los ajustes de un televisor */
        .menu-modal-container {
            width: 85% !important;
            height: 80% !important;
            max-width: 760px !important;
            max-height: 460px !important;
            gap: 8px !important;
            margin: auto !important;
            flex-shrink: 1 !important;
        }

        .menu-sidebar {
            width: 60px !important;
            min-width: 60px !important;
            flex-shrink: 0 !important;
            padding: 10px 0 !important;
            gap: 8px !important;
        }

        .sidebar-icon-item {
            min-height: 44px !important;
            font-size: 1.5rem !important;
        }

        .menu-content-card {
            min-width: 0 !important;
            padding: 15px !important;
            overflow-y: auto !important;
        }

        .menu-body-layout {
            min-height: 0 !important;
            gap: 12px !important;
        }

        .menu-photo-placeholder {
            width: 120px !important;
            height: 120px !important;
            flex-shrink: 0 !important;
        }

        .menu-text-bio {
            min-width: 0 !important;
            font-size: 1rem !important;
            line-height: 1.2 !important;
        }

        .menu-text-bio p {
            margin-bottom: 10px !important;
        }

        .menu-main-name {
            font-size: 2.5rem !important;
            margin-bottom: 12px !important;
        }

        .menu-header-title {
            font-size: 1.5rem !important;
        }

        .btn-close-menu {
            z-index: 100001 !important;
            top: 2px !important;
            right: 2px !important;
        }

        .btn-menu-icon {
            cursor: pointer !important;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
        }
    `;

    document.head.appendChild(style);

    function inicializarModoMovil() {
        const tvContainer = document.querySelector('.tv-screen-container');

        if (!tvContainer) {
            setTimeout(inicializarModoMovil, 100);
            return;
        }

        if (!tvContainer.parentElement.classList.contains('mobile-forced-landscape')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-forced-landscape';
            tvContainer.parentNode.insertBefore(wrapper, tvContainer);
            wrapper.appendChild(tvContainer);
            tvContainer.id = 'scaledForcedContainer';
        }

        const container =
            document.getElementById('scaledForcedContainer') || tvContainer;

        // Medir el espacio real disponible en la ventana
        const anchoDisponible = document.documentElement.clientWidth;
        const altoDisponible = document.documentElement.clientHeight;

        const baseWidth = 1366;
        const baseHeight = 768;

        // Calcular una escala que permita mostrar la televisión completa
        const scaleX = anchoDisponible / baseWidth;
        const scaleY = altoDisponible / baseHeight;
        const scale = Math.min(scaleX, scaleY);

        // Centrar y escalar la televisión
        container.style.transform =
            `translate(-50%, -50%) scale(${scale})`;
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
