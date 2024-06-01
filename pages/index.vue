<template>
    <div>
        <Today :today="todayCount" :week="weekCount" />
        <Welcome v-if="!events || events.length === 0" />
        <div v-else>
            <TodayEvents :today-events="todayEvents" :events="events" />
            <div class="relative mb-14" v-if="todayEvents.length > 0"></div>
            <div>
                <EventCard v-for="event in events.sort((a, b) =>
                    getLatestRepeat(b).diff(getLatestRepeat(a))).filter((e) =>
                        todayEvents.find((event) => event.name === e.name) === undefined)" :key="event.name"
                    :event="event" />
            </div>
        </div>
        <About />
        <PreviewFooter />
    </div>
</template>

<script setup lang="ts">
import moment from "moment";

const { t } = useI18n({ useScope: 'local' });
const events = ref([] as CountdownEvent[]);
const todayCount = ref(0);
const weekCount = ref(0);
let todayEvents = ref([] as CountdownEvent[]);
let weekEvents = ref([] as CountdownEvent[]);

onMounted(() => {
    const storedEvents = localStorage.getItem('events');

    if (storedEvents !== null) {
        const parsedEvents: CountdownEvent[] = JSON.parse(storedEvents);
        events.value = parsedEvents;
        todayEvents.value = parsedEvents.filter((e) => getLatestRepeat(e).isSame(moment(), 'day'));
        weekEvents.value = parsedEvents.filter((e) =>
            moment().startOf("day") <= getLatestRepeat(e) &&
            getLatestRepeat(e) <= moment().add(7, 'days'));
        todayCount.value = todayEvents.value.length;
        weekCount.value = weekEvents.value.length;
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
    defaultName: My Birthday
zh-CN:
    defaultName: 生日
ja:
    defaultName: 誕生日
</i18n>