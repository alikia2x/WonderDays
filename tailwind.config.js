/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            lineHeight: {
                12: "3rem",
            },
            screens: {
                lmb: "400px", //Large mobile
                mb: "368px", //Medium mobile
                smb: "352px", //Small mobile
                xsmb: "320px", //Extra small mobile
                mh: { raw: "(max-height: 768px)" }, //Medium height
                st: { raw: "(max-height: 576px)" }, //Short
                xst: { raw: "(max-height: 512px)" }, //Extra Short
                "2xst": { raw: "(max-height: 384px)" },
                "3xst": { raw: "(max-height: 256px)" },
            },
            transitionDuration: {
                250: "250ms",
            },
            height: {
                26: "6.5rem",
                70: "17.5rem",
                82: "20.5rem",
                86: "21.5rem",
                100: "25rem",
                112: "28rem",
                114: "28.5rem",
                118: "29.5rem",
                120: "30rem",
                124: "31rem",
                128: "32rem",
                134: "33.5rem",
                144: "36rem",
                154: "38.5rem",
                158: "39.5rem",
                160: "40rem",
                168: "42rem",
            },
            width: {
                100: "25rem",
                112: "28rem",
                120: "30rem",
                128: "32rem",
                144: "36rem",
                160: "40rem",
                168: "42rem",
            },
            spacing: {
                18: "4.5rem",
                42: "10.5rem",
            },
            inset: {
                42: "10.5rem",
            },
        },
    },
    plugins: [],
};
