// ajuste-movil.js - Limpieza total para que ocupe toda la pantalla real sin barras negras
(function() {
    function asegurarPantallaCompleta() {
        const container = document.getElementById('tvContainer');
        if (!container) return;

        // Forzamos que ocupe el 100% de la ventana sin reducirlo
        container.style.width = '100vw';
        container.style.height = '100vh';
    }

    window.addEventListener('resize', asegurarPantallaCompleta);
    window.addEventListener('orientationchange', () => setTimeout(asegurarPantallaCompleta, 300));
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', asegurarPantallaCompleta);
    } else {
        asegurarPantallaCompleta();
    }
})();