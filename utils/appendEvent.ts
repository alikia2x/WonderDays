type appendEventResult = {
    code: number;
    details: string;
};

export default function (name: string, data: CountdownEvent): appendEventResult {
    const storedEvents = localStorage["events"];
    if (storedEvents === undefined) {
        localStorage["events"] = JSON.stringify([data]);
        return { code: 0, details: "Success." };
    }
    const currentEvents: CountdownEvent[] = JSON.parse(storedEvents);
    localStorage["events"] = JSON.stringify([...currentEvents, data]);
    return { code: 0, details: "Success." };
}
