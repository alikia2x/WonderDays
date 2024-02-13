const darkBackgroundPalette = {
    blue: '#292E3D',
    red: '#3D2929',
};
const lightBackgroundPalette = {
    blue: '#EFF6FE',
    red: '#FFF0F0'
};
const darkBorderPalette = {
    blue: '#7F9DCD',
    red: '#EA8B7D',
};
const lightBorderPalette = {
    blue: '#A2D2FF',
    red: '#FF9888',
};

export default function (kind: "bg"|"border", darkMode: boolean) {
    const caseNum: number = (kind === "bg" ? 0 : 1) + (darkMode ? 2 : 0);
    switch (caseNum) {
        case 0: // means light theme and bg
            return lightBackgroundPalette;
        case 1: // means light theme and border
            return lightBorderPalette;
        case 2: // means dark theme and bg
            return darkBackgroundPalette;
        case 3: // menas dark theme and border
            return darkBorderPalette;
    }
}