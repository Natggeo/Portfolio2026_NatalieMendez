// ajuste-movil.js - Ocupación absoluta y aviso de rotación vertical
(function() {
    // 1. TU CÓDIGO ORIGINAL: Forzar pantalla completa real
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


    // 2. NUEVO COMPONENTE: Pantalla de aviso de rotación (separado y seguro)
    function gestionarAvisoVertical() {
        let aviso = document.getElementById('aviso-girar-pantalla');
        
        // Creamos el elemento si no existe
        if (!aviso) {
            aviso = document.createElement('div');
            aviso.id = 'aviso-girar-pantalla';
            aviso.innerHTML = `
                <div class="aviso-content">
                    <div class="aviso-icon">📱 ⟳ 🖥️</div>
                    <h2>¡GIRA TU DISPOSITIVO!</h2>
                    <p>Para disfrutar de la experiencia retro completa en tu pantalla de TV, por favor coloca tu teléfono en posición horizontal.</p>
                </div>
            `;
            
            // Estilos retro integrados con tu paleta de colores
            const estilo = document.createElement('style');
            estilo.innerHTML = `
                #aviso-girar-pantalla {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: #290087;
                    color: #F6FFE9;
                    z-index: 99999;
                    display: none;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    text-align: center;
                    border: 6px solid #F137A6;
                    box-sizing: border-box;
                    box-shadow: inset 0 0 50px rgba(0,0,0,0.8);
                }
                #aviso-girar-pantalla .aviso-content {
                    background-color: #1a084c;
                    border: 3px solid #F2E0A4;
                    border-radius: 12px;
                    padding: 25px 20px;
                    max-width: 320px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                }
                #aviso-girar-pantalla .aviso-icon {
                    font-size: 2.8rem;
                    margin-bottom: 12px;
                    animation: animacionGirar 2s infinite ease-in-out;
                }
                #aviso-girar-pantalla h2 {
                    font-family: 'Chunko', sans-serif;
                    font-size: 1.6rem;
                    color: #F2E0A4;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }
                #aviso-girar-pantalla p {
                    font-family: 'Teko', sans-serif;
                    font-size: 1.25rem;
                    line-height: 1.15;
                    color: #F6FFE9;
                }
                @keyframes animacionGirar {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(90deg); }
                    100% { transform: rotate(0deg); }
                }
            `;
            document.head.appendChild(estilo);
            document.body.appendChild(aviso);
        }

        // Mostrar u ocultar dependiendo de si está en vertical u horizontal
        if (window.innerHeight > window.innerWidth) {
            aviso.style.display = 'flex';
        } else {
            aviso.style.display = 'none';
        }
    }

    // Escuchar eventos para el aviso
    window.addEventListener('resize', gestionarAvisoVertical);
    window.addEventListener('orientationchange', () => setTimeout(gestionarAvisoVertical, 300));
    window.addEventListener('DOMContentLoaded', gestionarAvisoVertical);
    
    // Verificación inicial
    setTimeout(gestionarAvisoVertical, 50);
})();