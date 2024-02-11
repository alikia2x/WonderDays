<template>
    <Today />
    <Welcome v-if="!events || events.length === 0" />
    <EventCard v-else v-for="event in events" :key="event.name" :event="event" :darkMode="darkMode" 
    class="mb-4 relative pl-4 py-4 rounded-r-lg" />
    <div v-for="event in newestEvents" :key="newestEvents">{{ event }}</div>
</template>
  
<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        // 初始化 events 数据
        const events = ref([]);
        const darkMode = ref(false); // 默认为浅色模式
        const newestEvents = ref([]);

        const updateDarkMode = (e) => {
            darkMode.value = e.matches;
        };

        // 在浏览器环境中才执行
        if (process.client) {
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            updateDarkMode(mql);
            mql.onchange = (e) => updateDarkMode(e);
        }
        onMounted(() => {
            // 读取 localStorage 中的 events 数据
            const storedEvents = JSON.parse(localStorage.getItem('events'));

            if (storedEvents) {
                // 如果存在数据，则使用 localStorage 中的数据
                events.value = storedEvents;
                for (let i = 0; i < events.value.length; i++) {
                    newestEvents.value.push(getLatestRepeat(events.value[i]));
                }
            } else {
                // 否则，手动初始化数据并保存到 localStorage
                events.value = [
                    {
                        name: 'My Birthday',
                        calendar: 'gregorian',
                        year: 2008,
                        month: 8,
                        day: 16,
                        repeat: '1,year',
                        reminder: [],
                        background: 'blue',
                        border: 'blue',
                    },
                ];
                localStorage.setItem('events', JSON.stringify(events.value));
            }
        });
        return {
            events,
            newestEvents,
            darkMode
        };
    },
};
</script>
  