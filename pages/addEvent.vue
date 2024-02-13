<template>
    <h1>{{ t('newEvent') }}</h1>
    <label>
        <h2>{{ t('eventName') }}</h2>
        <input id="name" autocomplete="none" :placeholder="t('name')">
    </label>
    <label>
        <h2>{{ t('date') }}</h2>
        <input type="date" id="date" value="2024-02-09">
    </label>
    <label>
        <h2 class="flex items-center">
            <span>{{ t('time') }}</span>
            <span class="ml-2 mt-[0.0625rem] px-[0.3125rem] py-[0.125rem] rounded text-xs font-normal 
         bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 text-zinc-700 align-middle">
                {{ t('optional') }}
            </span>
        </h2>
        <input value="00:00" type="time" id="time">
    </label>

    <h2>{{ t('style') }}</h2>
    <ColorPicker v-model:bgColor="bgColor" v-model:borderColor="borderColor" />
</template>

<style>
:root {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

h1 {
    font-size: 1.875rem;
    line-height: 2.5rem;
    font-weight: 700;
}

h2 {
    margin-top: 16px;
    font-size: 1.25rem;
    line-height: 1.75rem;
    line-height: 2rem;
    font-weight: 500;
}

input {
    padding-left: 0.25rem;
    height: 2rem;
    margin-top: 0.5rem;
    border-width: 2px;
    border-color: #D4D4D8;
    outline: none;
    transition: all 200ms;
    border-radius: 0.375rem;
    width: 100%;
}

input:focus {
    border-color: #000;
}

@media (prefers-color-scheme: dark) {
    input {
        background-color: #2c2c2f;
        border-color: #2c2c2f;
    }

    input:focus {
        border-color: #a0a2a6;
    }
}
</style>

<script setup>
const { t } = useI18n({
    useScope: 'local'
})
const bgColor = ref("");
const borderColor = ref("");
</script>

<i18n lang="yaml">
    en:
        newEvent: 'New Event'
        eventName: 'Event Name'
        name: 'Name'
        date: 'Date'
        time: 'Time'
        style: 'Style'
        optional: 'Optional'
    zh-CN:
        newEvent: '添加新事件'
        eventName: '名称'
        name: '名称'
        date: '日期'
        time: '时间'
        style: '样式'
        optional: '选填'
</i18n>