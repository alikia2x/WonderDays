export default function (dateString: string): boolean {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return false;
    }

    // Check if the date has a time component
    const hasTime =
        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0;

    return hasTime;
}