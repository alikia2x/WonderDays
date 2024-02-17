<template>
    <div class="absolute back">
        <NuxtLink href="/">
            <Icon class="text-5xl" name="bitcoin-icons:arrow-left-outline"></Icon>
        </NuxtLink>
    </div>

    <div class="relative h-fit min-h-72">
        <h1 class="text-5xl mb-6 font-extralight">{{ name + t('space') + suffix }}</h1>
        <SplitLine></SplitLine>
        <label for="relativeTime">
            <span class="sr-only">{{ relativeDaysSR }}</span>
        </label>
        <div id="relativeTime" class="my-4">
            <span class="relative text-8xl font-thin">{{ relativeDays }}</span>
            <span>{{ t('space') }}</span>
            <span class="relative text-3xl leading-12 ml-1 font-extralight">{{ unit }}</span>
        </div>
        <button v-if="!confirmDelete" @click="confirmDelete = true"
            class="border-2 border-black dark:border-white hover:bg-[#FF0000] hover:border-[#FF0000] dark:hover:border-[#FF0000] duration-200 px-4 py-2 rounded-md mt-4">
            {{ t('delete') }}
        </button>

        <button v-if="confirmDelete" @click="deleteEvent"
            class="border-2 border-black dark:border-white hover:bg-[#FF0000] hover:border-[#FF0000] dark:hover:border-[#FF0000] duration-200 px-4 py-2 rounded-md mt-4">
            {{ t('deleteConfirm') }}
        </button>

        <button v-if="confirmDelete" @click="confirmDelete = false"
            class="ml-2 border-2 border-black dark:border-white hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black hover:dark:border-white duration-200 px-4 py-2 rounded-md mt-4">
            {{ t('cancelDelete') }}
        </button>
    </div>
</template>

<style>
.back {
    transform: translateY(calc(-100% - 1rem));
}

@media (min-width: 1024px) {
    .back {
        transform: translateX(calc(-100% - 1rem));
    }
}

.icon path{
    stroke: black;
}

@media (prefers-color-scheme: dark) {
    .icon path{
        stroke: white;
    }
}
</style>

<script setup lang="ts">
import moment from 'moment';
const route = useRoute();
const name = route.params.id as string;
if (getEvent(name).code) {
    location.href = "/";
}
const event = getEvent(name).data as CountdownEvent;
const nextDate = getLatestRepeat(event);
const { t } = useI18n({ useScope: 'local' });

const isFuture = nextDate.isAfter(moment());
const relativeDays = isFuture ? Math.ceil(nextDate.diff(moment(), 'days', true)) : Math.ceil(moment().diff(nextDate, 'days', true));
const relativeDaysSR = isFuture ? t('remainDaysSR').replaceAll('%s', relativeDays.toString()) : t('pastDaysSR').replaceAll('%d', relativeDays.toString());
const suffix = isFuture ? t('remain') : t('past');
const unit = relativeDays > 1 ? t('days') : t('day');
const confirmDelete = ref(false);

const deleteEvent = () => {
    let events: CountdownEvent[] = JSON.parse(localStorage.getItem('events') || '[]');
    events = events.filter((e) => e.name !== name);
    localStorage.setItem('events', JSON.stringify(events));
    location.href = "/";
};
</script>

<i18n lang="yaml">
en:
    later: "later"
    ago: "ago"
    space: ' '
    remainDaysSR: '%s days left.'
    pastDaysSR: '%d days ago.'
    day: 'day'
    days: 'days'
    remain: 'in:'
    past: 'has passsed:'
    unitMargin: '2.75rem'
    delete: 'Remove Event'
    deleteConfirm: 'Confirm to Remove'
    cancelDelete: 'Cancel'
zh-CN:
    later: "后"
    ago: "前"
    space: ''
    remainDaysSR: '还有 %s 天'
    pastDaysSR: '%d 天前'
    day: '天'
    days: '天'
    remain: '还有：'
    past: '已过：'
    unitMargin: '2.55rem'
    delete: '删除事件'
    deleteConfirm: '确认删除'
    cancelDelete: '取消删除'
ja:
    later: "後で"
    ago: "前"
    space: ''
    remainDaysSR: '%d 日が残ります。'
    pastDaysSR: '%d 日前'
    day: '日'
    days: '日'
    remain: 'まであと：'
    past: 'が過ぎた：'
    unitMargin: '2.55rem'
    delete: '削除'
    deleteConfirm: '本当に削除しますか？'
    cancelDelete: 'キャンセル'
</i18n>    