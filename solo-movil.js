// solo-movil.js - Versión móvil exclusiva en horizontal con aviso de giro y visibilidad total
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Detección estricta de dispositivos móviles
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    // Si es PC, el script se detiene y tu versión de computadora se queda 100% intacta
    if (!esMovil) {
        return; 
    }

    // 2. Inyectar estilos para el aviso de rotación y el contenedor horizontal
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

        /* Pantalla de aviso para girar el celular (solo aparece en vertical) */
        #aviso-rotacion {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-color: #000 !important;
            color: #F6FFE9 !important;
            font-family: sans-serif;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            padding: 25px !important;
            z-index: 99999 !important;
            box-sizing: border-box !important;
        }

        #aviso-rotacion h2 {
            font-family: 'Chunko', sans-serif, Arial;
            color: #F137A6;
            font-size: 1.8rem;
            margin-bottom: 15px;
            text-shadow: 2px 2px 0px #290087;
        }

        #aviso-rotacion p {
            font-size: 1.1rem;
            color: #F2E0A4;
            max-width: 320px;
            line-height: 1.5;
        }

        /* Icono animado de giro */
        .icono-giro {
            font-size: 3.5rem;
            margin-bottom: 20px;
            animation: girarCelular 2s infinite ease-in-out;
        }

        @keyframes girarCelular {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(90deg); }
            100% { transform: rotate(0deg); }
        }

        /* Contenedor principal en modo horizontal */
        .mobile-landscape-wrapper {
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

        /* Consola de 1366x768 centrada y lista para interactuar */
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

    // 3. Crear el elemento visual del aviso de rotación
    if (!document.getElementById('aviso-rotacion')) {
        const aviso = document.createElement('div');
        aviso.id = 'aviso-rotacion';
        aviso.innerHTML = `
            <div class="icono-giro">📱🔄</div>
            <h2>¡Gira tu dispositivo!</h2>
            <p>Para disfrutar de la experiencia interactiva de la televisión y acceder al menú, por favor coloca tu celular en posición <strong>horizontal</strong>.</p>
        `;
        document.body.appendChild(aviso);
    }

    // 4. Envolver automáticamente el televisor
    const tvContainer = document.querySelector('.tv-screen-container');
    if (tvContainer && !tvContainer.parentElement.classList.contains('mobile-landscape-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-landscape-wrapper';
        tvContainer.parentNode.insertBefore(wrapper, tvContainer);
        wrapper.appendChild(tvContainer);
        tvContainer.id = 'scaledLandscapeContainer';
    }

    // 5. Función de control: detecta si está en vertical u horizontal y escala perfecto
    function verificarOrientacionYEscala() {
        const aviso = document.getElementById('aviso-rotacion');
        const wrapper = document.querySelector('.mobile-landscape-wrapper');
        const container = document.getElementById('scaledLandscapeContainer') || document.querySelector('.tv-screen-container');
        
        if (!container) return;

        const ancho = window.innerWidth;
        const alto = window.innerHeight;

        // Si el usuario sostiene el celular en vertical (Portrait)
        if (ancho < alto) {
            aviso.style.display = 'flex';
            wrapper.style.display = 'none';
        } else {
            // Si el usuario gira el celular a horizontal (Landscape)
            aviso.style.display = 'none';
            wrapper.style.display = 'flex';

            const vw = window.visualViewport ? window.visualViewport.width : ancho;
            const vh = window.visualViewport ? window.visualViewport.height : alto;

            const baseWidth = 1366;
            const baseHeight = 768;

            const scaleX = vw / baseWidth;
            const scaleY = vh / baseHeight;
            
            // Escala exacta para que encaje de lado a lado sin cortar ningún botón ni descripción
            const scale = Math.min(scaleX, scaleY);

            container.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    }

    window.addEventListener('resize', verificarOrientacionYEscala);
    window.addEventListener('orientationchange', () => {
        setTimeout(verificarOrientacionYEscala, 300);
    });

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', verificarOrientacionYEscala);
        window.visualViewport.addEventListener('scroll', verificarOrientacionYEscala);
    }

    verificarOrientacionYEscala();
});