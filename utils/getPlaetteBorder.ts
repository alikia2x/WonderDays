export default function (hexColor: string, luminanceAdjustment: number = 0.2): string {
    // Ensure the luminance adjustment is within the valid range [-1, 1]
    luminanceAdjustment = Math.max(-1, Math.min(1, luminanceAdjustment));

    // Parse the hex color into RGB components
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    // Adjust luminance
    const adjustedR = Math.round(r + luminanceAdjustment * (255 - r));
    const adjustedG = Math.round(g + luminanceAdjustment * (255 - g));
    const adjustedB = Math.round(b + luminanceAdjustment * (255 - b));

    // Ensure the RGB values are within the valid range [0, 255]
    const clampedR = Math.min(255, Math.max(0, adjustedR));
    const clampedG = Math.min(255, Math.max(0, adjustedG));
    const clampedB = Math.min(255, Math.max(0, adjustedB));

    // Convert the adjusted RGB values back to a hex color string
    const resultHexColor = `#${(1 << 24 | clampedR << 16 | clampedG << 8 | clampedB).toString(16).slice(1)}`;

    return resultHexColor;
}