type getEventResult = {
    code: number;
    data: CountdownEvent | null;
};

export default function (name: string): getEventResult {
    const storedEvents = localStorage["events"];
    if (storedEvents === undefined) {
        return { code: -1, data: null };
    }
    const parsedEvents: CountdownEvent[] = JSON.parse(storedEvents);
    for (const event of parsedEvents) {
        if (event.name.toLowerCase() === name.toLowerCase()) {
            return { code: 0, data: event };
        }
    }
    return { code: 1, data: null };
}
