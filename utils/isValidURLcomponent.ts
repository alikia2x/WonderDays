export default function isValidURLcomponent(text: string): boolean {
    const invalidCharsRegex = /[\/\?]/;
    return !invalidCharsRegex.test(text);
}
