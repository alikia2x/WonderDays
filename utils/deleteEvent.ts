type deleteEventResult = {
    code: number;
    details: string;
};

export default function (name: string, data: CountdownEvent): deleteEventResult {
    const storedEvents = localStorage["events"];
    if (storedEvents === undefined) {
        return { code: 400, details: "localStorage has not been intialized." };
    }
    const parsedEvents: CountdownEvent[] = JSON.parse(storedEvents);
    if (parsedEvents.find((event) => event.name === name) === undefined) {
        return { code: 404, details: "Event not found." };
    }
    localStorage["events"] = JSON.stringify(parsedEvents.filter((event) => event.name !== name));
    return { code: 0, details: "Success." };
}
