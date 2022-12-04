/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "texto-basico": "#000000",
                "texto-secundario": "#766868",
                "texto-sobre-color": "#FFFFFF",
                "fresh-verde": "#1ACE97",
                "fresh-verde-oscuro": "#4C987B",
                "fresh-morado": "#976D9C",
                "fresh-naranja": "#F4511D",
                "fresh-azul-claro": "#E0F4FC",
                "fresh-fondo-amarillo": "#F8EED1",
                "fresh-fondo-azul": "#E0F4FC",
                "fresh-verde-claro": "#B5EFA1",
                "fresh-amarillo": "#F2C35B",
                "fresh-naranja-claro": "#F38F42",
                "fresh-morado-claro": "#C19DCE",
                "fresh-azul": "#A8CBFF",
                "fresh-morado-oscuro": "#66496A",
                "fresh-salmon": "#F7DBAD",
                "fresh-salmon-claro": "#F6DCBF",
                "fresh-verde-azul": "#E3F8F9",
            },
            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
                "space-mono": ["Space Mono", "monospace"],
            },
            borderRadius: {
                fresh: "16px",
            },
            transitionProperty: {
                height: "height",
                width: "width",
            },
            minWidth: {
                screen: "100vw",
            },
        },
    },
    plugins: [],
};
