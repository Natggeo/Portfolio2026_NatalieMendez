// solo-movil.js - Versión limpia y nativa para móviles (sin scale roto para proteger clics y videos)
(function() {
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;

    if (!esMovil) {
        return; 
    }

    // Inyectamos un estilo móvil limpio que respeta los eventos táctiles y los videos
    const style = document.createElement('style');
    style.innerHTML = `
        /* Forzar modo horizontal en la estructura base sin usar scale de JS */
        html, body {
            background-color: #000 !important;
            width: 100vw !important;
            min-height: 100vh !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* Hacemos que cualquier contenedor principal se adapte de forma fluida y 100% interactiva */
        .tv-screen-container, 
        .container, 
        .container-fluid {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 10px !important;
            box-sizing: border-box !important;
            transform: none !important; /* Eliminamos el scale para que los clics y videos funcionen perfectamente */
            position: relative !important;
            top: auto !important;
            left: auto !important;
        }

        /* Asegurar que los videos e iframes vuelvan a mostrarse y reproducirse con normalidad */
        video, iframe, embed, object {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);

    console.log("Modo móvil nativo activado: Clics y videos restaurados.");
})();
