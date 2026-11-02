(function () {
    function iniciarCRT() {
        if (document.getElementById("crt-overlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "crt-overlay";

        const rgb = document.createElement("div");
        rgb.className = "crt-rgb";

        const reflection = document.createElement("div");
        reflection.className = "crt-reflection";

        overlay.appendChild(rgb);
        overlay.appendChild(reflection);

        document.body.appendChild(overlay);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarCRT);
    } else {
        iniciarCRT();
    }
})();
