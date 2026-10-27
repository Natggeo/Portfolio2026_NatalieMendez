// aviso-movil.js - Inyector global del aviso de rotación para dispositivos móviles
document.addEventListener("DOMContentLoaded", function() {
    // 1. Crear el contenedor HTML del aviso
    const overlay = document.createElement('div');
    overlay.id = 'landscapeWarning';
    overlay.className = 'rotate-device-overlay';
    overlay.innerHTML = `
        <div class="rotate-box">
            <div class="rotate-icon">📱 ⟳</div>
            <h2>GIRA TU DISPOSITIVO</h2>
            <p>Para disfrutar de la mejor experiencia retro en tu TV, por favor coloca tu celular en horizontal.</p>
        </div>
    `;
    document.body.appendChild(overlay);

    // 2. Crear e inyectar los estilos CSS necesarios
    const style = document.createElement('style');
    style.innerHTML = `
        .rotate-device-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #120638;
            z-index: 99999;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            color: #F6FFE9;
            font-family: 'Teko', sans-serif;
        }

        .rotate-box {
            background-color: #290087;
            border: 4px solid #F2E0A4;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 0 30px rgba(241, 55, 166, 0.6);
            max-width: 350px;
            margin: auto;
        }

        .rotate-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            animation: spinIcon 2s infinite ease-in-out;
        }

        .rotate-device-overlay h2 {
            font-family: 'Chunko', sans-serif;
            font-size: 1.8rem;
            color: #F137A6;
            margin-bottom: 10px;
        }

        .rotate-device-overlay p {
            font-size: 1.3rem;
            line-height: 1.2;
        }

        @keyframes spinIcon {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(90deg); }
            100% { transform: rotate(0deg); }
        }

        /* Se activa únicamente en celulares cuando están en vertical (portrait) */
        @media screen and (max-width: 900px) and (orientation: portrait) {
            .rotate-device-overlay {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);
});