// ajuste-movil.js - Ocupación absoluta del 100% de la pantalla sin espacios
(function() {
    function forzarPantallaCompletaReal() {
        const container = document.getElementById('tvContainer');
        if (!container) return;

        // Fijamos las dimensiones exactas del área gráfica visible de la ventana
        container.style.width = window.innerWidth + 'px';
        container.style.height = window.innerHeight + 'px';
    }

    window.addEventListener('resize', forzarPantallaCompletaReal);
    window.addEventListener('orientationchange', () => setTimeout(forzarPantallaCompletaReal, 300));
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forzarPantallaCompletaReal);
    } else {
        forzarPantallaCompletaReal();
    }
})();