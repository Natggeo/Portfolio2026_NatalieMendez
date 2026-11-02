// ajuste-movil.js - Ocupación absoluta y pantalla de advertencia estilo minimalista
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


    // 2. NUEVO COMPONENTE: Pantalla de aviso idéntica a tu referencia con el teléfono animado
    function gestionarAvisoVertical() {
        let aviso = document.getElementById('aviso-girar-pantalla');
        
        // Creamos el elemento si no existe
        if (!aviso) {
            aviso = document.createElement('div');
            aviso.id = 'aviso-girar-pantalla';
            aviso.innerHTML = `
                <div class="aviso-telefono-icon"></div>
                <h2>Gira tu teléfono</h2>
                <p>Coloca tu dispositivo en horizontal para disfrutar de la experiencia completa de televisión.</p>
            `;
            
            // Estilos CSS exactos basados en la imagen que compartiste
            const estilo = document.createElement('style');
            estilo.innerHTML = `
                #aviso-girar-pantalla {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: #000000;
                    color: #FFFFFF;
                    z-index: 99999;
                    display: none;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 30px;
                    text-align: center;
                    box-sizing: border-box;
                    font-family: 'Teko', sans-serif;
                }
                
                /* Diseño del teléfono estilizadamente ilustrado con CSS puro */
                #aviso-girar-pantalla .aviso-telefono-icon {
                    width: 42px;
                    height: 76px;
                    background: linear-gradient(135deg, #a5f3fc, #38bdf8);
                    border: 3px solid #e0f2fe;
                    border-radius: 10px;
                    margin-bottom: 25px;
                    box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
                    position: relative;
                    animation: rotarTelefonoAnimado 3s infinite ease-in-out;
                    transform-origin: center center;
                }
                
                /* Detalle de la camarita/altavoz del teléfono */
                #aviso-girar-pantalla .aviso-telefono-icon::before {
                    content: '';
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 10px;
                    height: 3px;
                    background-color: #0284c7;
                    border-radius: 2px;
                }

                #aviso-girar-pantalla h2 {
                    font-family: 'Chunko', sans-serif;
                    font-size: 1.8rem;
                    color: #FFFFFF;
                    margin-bottom: 12px;
                    letter-spacing: 0.5px;
                    font-weight: normal;
                }

                #aviso-girar-pantalla p {
                    font-family: 'Teko', sans-serif;
                    font-size: 1.25rem;
                    line-height: 1.2;
                    color: #A1A1AA;
                    max-width: 280px;
                }

                /* Animación continua de rotación de vertical a horizontal */
                @keyframes rotarTelefonoAnimado {
                    0% {
                        transform: rotate(0deg);
                    }
                    35% {
                        transform: rotate(90deg);
                    }
                    65% {
                        transform: rotate(90deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(estilo);
            document.body.appendChild(aviso);
        }

        // Mostrar u ocultar dependiendo de si el teléfono está en vertical u horizontal
        if (window.innerHeight > window.innerWidth) {
            aviso.style.display = 'flex';
        } else {
            aviso.style.display = 'none';
        }
    }

    // Escuchar eventos de cambio de orientación y tamaño
    window.addEventListener('resize', gestionarAvisoVertical);
    window.addEventListener('orientationchange', () => setTimeout(gestionarAvisoVertical, 300));
    window.addEventListener('DOMContentLoaded', gestionarAvisoVertical);
    
    // Verificación inicial al cargar
    setTimeout(gestionarAvisoVertical, 50);
})();