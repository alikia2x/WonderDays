import Color from "colorjs.io"

export default function (hexColor: string, d: number, p: string = "l"): string {
    const c = new Color(hexColor);
    switch (p) {
        case 'l':
            c.lch.l*=1+d;
            break;
        case 'c':
            c.lch.c*=1+d;
            break;
        case 'h':
            c.lch.h*=1+d;
        default:
            break;
    }
    return c.toString({format: "hex"});
}
