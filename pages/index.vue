<template>
    <Today :today="todayCount" :week="weekCount" />
    <Welcome v-if="!events || events.length === 0" />
    <EventCard v-else v-for="event in events" :key="event.name" :event="event" />
</template>
  
<script setup>
import moment from "moment";

const events = ref([]);
const todayCount = ref(0);
const weekCount = ref(0);
const { t } = useI18n({
    useScope: 'local'
})

// Run in client, load/init events
onMounted(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));

    if (storedEvents) {
        events.value = storedEvents;
        // calculate number of events today
        for (let e of storedEvents) {
            const repeatDate=getLatestRepeat(e);
            if (repeatDate.isSame(moment(), 'day')) {
                todayCount.value++;
            }
            else if (e.repeat!==null && moment().add(7,'days') > repeatDate){
                weekCount.value++;
            }
        }
    }
    else {
        // TODO: initialize
        events.value = [
            {
                name: t('defaultName'),
                calendar: 'gregorian',
                date: "2008-08-16",
                repeat: '1,year',
                reminder: [],
                background: 'blue',
                border: 'blue',
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
</i18n>