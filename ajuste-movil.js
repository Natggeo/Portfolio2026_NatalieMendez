// ajuste-movil.js - Ajuste automático de pantalla completa para versiones móviles
(function() {
    function ajustarAreaMovil() {
        const container = document.getElementById('tvContainer');
        if (!container) return;

        // Obtiene las dimensiones reales y exactas del área visible del navegador móvil
        const anchoReal = window.innerWidth;
        const altoReal = window.innerHeight;

        // Aplica el tamaño milimétrico para que encaje perfecto sin desbordarse ni requerir scroll
        container.style.width = (anchoReal * 0.96) + 'px';
        container.style.height = (altoReal * 0.94) + 'px';
    }

    window.addEventListener('resize', ajustarAreaMovil);
    window.addEventListener('orientationchange', () => setTimeout(ajustarAreaMovil, 300));
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ajustarAreaMovil);
    } else {
        ajustarAreaMovil();
    }
})();