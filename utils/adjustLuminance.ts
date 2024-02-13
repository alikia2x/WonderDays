import Color from "colorjs.io"

export default function (hexColor: string, d: number): string {
    let c = new Color(hexColor);
    c.lch.l*=1+d;
    return c.toString({format: "hex"});
}
