<template>
    <div>
        <EventCard v-for="event in events.filter((e) =>
            todayEvents.find((event) => event.name === e.name) !== undefined)" :key="event.name" :event="event" />
    </div>
</template>

<script setup lang="ts">
import { CountdownEvent } from '~/types/event';

const props = defineProps<{
    todayEvents: CountdownEvent[],
    events: CountdownEvent[]
}>();
</script>