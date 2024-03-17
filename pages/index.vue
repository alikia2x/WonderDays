<template>
    <div>
        <Today :today="todayCount" :week="weekCount" />
        <Welcome v-if="!events || events.length === 0" />
        <EventCard v-else v-for="event in events" :key="event.name" :event="event" />
        <About></About>
        <p>
            <ExportBackup></ExportBackup>
            <ImportBackup></ImportBackup>
        </p>
    </div>
</template>

<script setup lang="ts">
import moment from "moment";

const events = ref([] as CountdownEvent[]);
const todayCount = ref(0);
const weekCount = ref(0);
const { t } = useI18n({
    useScope: 'local'
})

// Run in client, load/init events
onMounted(() => {
    const storedEvents = localStorage.getItem('events');

    if (storedEvents !== null) {
        const parsedEvents: [CountdownEvent] = JSON.parse(storedEvents);
        events.value = parsedEvents;
        // calculate number of events today
        for (let e of parsedEvents) {
            const repeatDate = getLatestRepeat(e);
            if (repeatDate.isSame(moment(), 'day')) {
                todayCount.value++;
            }
            else if (e.repeat != "" && moment().add(7, 'days') > repeatDate) {
                weekCount.value++;
            }
        }
    }
    else {
        // TODO: initialize
        events.value = [
            {
                background: 'blue',
                border: 'blue',
                calendar: 'gregorian',
                date: "2008-08-16",
                name: t('defaultName'),
                repeat: '1,year',
                reminder: [],
                sticker: [],
            },
        ];
        localStorage.setItem('events', JSON.stringify(events.value));
    }
});
</script>

<i18n lang="yaml">
en:
    defaultName: 'My Birthday'
zh-CN:
    defaultName: '生日'
ja:
    defaultName: '誕生日'
</i18n>