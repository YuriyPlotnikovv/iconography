import localFont from "next/font/local";

export const cyrillicOld = localFont({
    src: [
        {
            path: "../fonts/CyrillicOld.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/CyrillicOld.woff",
            weight: "400",
            style: "normal",
        }
    ],
    variable: "--font-decor",
    display: "swap",
});

export const playfair = localFont({
    src: [
        {
            path: "../fonts/PlayfairDisplay-Variable.woff2",
            weight: "400 900",
            style: "normal",
        },
        {
            path: "../fonts/PlayfairDisplay-Variable.woff",
            weight: "400 900",
            style: "normal",
        },
        {
            path: "../fonts/PlayfairDisplay-Italic-Variable.woff2",
            weight: "400 900",
            style: "italic",
        },
        {
            path: "../fonts/PlayfairDisplay-Italic-Variable.woff",
            weight: "400 900",
            style: "italic",
        }
    ],
    variable: "--font-title",
    display: "swap",
});

export const montserrat = localFont({
    src: [
        {
            path: "../fonts/Montserrat-Variable.woff2",
            weight: "100 900",
            style: "normal",
        },
        {
            path: "../fonts/Montserrat-Variable.woff",
            weight: "100 900",
            style: "normal",
        },
        {
            path: "../fonts/Montserrat-Italic-Variable.woff2",
            weight: "100 900",
            style: "italic",
        },
        {
            path: "../fonts/Montserrat-Italic-Variable.woff",
            weight: "100 900",
            style: "italic",
        }
    ],
    variable: "--font-text",
    display: "swap",
});