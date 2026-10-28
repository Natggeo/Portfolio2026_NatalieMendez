/* solo-movil.js - Experiencia de televisión para móviles */
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

        /* Contenedor de la televisión */
        .mobile-forced-landscape {
            position: fixed !important;
            inset: 0 !important;
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

        /* Menú de ajustes estilo televisión */
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

        /* Pantalla que aparece cuando el móvil está en vertical */
        .rotate-phone-screen {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: #000 !important;
            color: #fff !important;
            z-index: 100002 !important;
            display: none;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 24px !important;
            box-sizing: border-box !important;
            font-family: Arial, sans-serif !important;
        }

        .rotate-phone-icon {
            font-size: 64px !important;
            line-height: 1 !important;
            margin-bottom: 28px !important;
            display: inline-block !important;
            animation: phone-rotation 2s ease-in-out infinite !important;
        }

        .rotate-phone-title {
            color: #fff !important;
            font-size: 22px !important;
            font-weight: bold !important;
            margin: 0 0 12px !important;
        }

        .rotate-phone-message {
            color: #bdbdbd !important;
            font-size: 15px !important;
            line-height: 1.5 !important;
            max-width: 300px !important;
            margin: 0 !important;
        }

        @keyframes phone-rotation {
            0%, 20% {
                transform: rotate(0deg);
            }
            60%, 85% {
                transform: rotate(-90deg);
            }
            100% {
                transform: rotate(-90deg);
            }
        }

        /* La televisión solo se muestra en horizontal */
        @media (orientation: portrait) {
            .mobile-forced-landscape {
                display: none !important;
            }

            .rotate-phone-screen {
                display: flex !important;
            }
        }

        @media (orientation: landscape) {
            .rotate-phone-screen {
                display: none !important;
            }
        }
    `;

    document.head.appendChild(style);

    /* Crear la pantalla de orientación */
    function crearPantallaRotacion() {
        if (document.getElementById('rotatePhoneScreen')) {
            return;
        }

        const pantalla = document.createElement('div');
        pantalla.id = 'rotatePhoneScreen';
        pantalla.className = 'rotate-phone-screen';

        pantalla.innerHTML = `
            <div class="rotate-phone-icon" aria-hidden="true">📱</div>
            <h2 class="rotate-phone-title">
                Gira tu teléfono
            </h2>
            <p class="rotate-phone-message">
                Coloca tu dispositivo en horizontal para disfrutar
                de la experiencia completa de televisión.
            </p>
        `;

        document.body.appendChild(pantalla);
    }

    function inicializarModoMovil() {
        const tvContainer =
            document.querySelector('.tv-screen-container');

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

        // Usar el espacio disponible en la pantalla
        const anchoDisponible = document.documentElement.clientWidth;
        const altoDisponible = document.documentElement.clientHeight;

        const baseWidth = 1366;
        const baseHeight = 768;

        // Mantener la proporción original de la televisión
        const scaleX = anchoDisponible / baseWidth;
        const scaleY = altoDisponible / baseHeight;
        const scale = Math.min(scaleX, scaleY);

        container.style.transform =
            `translate(-50%, -50%) scale(${scale})`;
    }

    function actualizarOrientacion() {
        crearPantallaRotacion();
        inicializarModoMovil();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', actualizarOrientacion);
    } else {
        actualizarOrientacion();
    }

    window.addEventListener('resize', actualizarOrientacion);

    window.addEventListener('orientationchange', () => {
        setTimeout(actualizarOrientacion, 400);
    });

    if (window.visualViewport) {
        window.visualViewport.addEventListener(
            'resize',
            actualizarOrientacion
        );
    }
})();
