<template>
    <div>
        <div class="absolute back">
            <NuxtLink tabindex="0" :aria-label="t('back')" href="/">
                <Icon class="text-5xl" name="bitcoin-icons:arrow-left-outline"></Icon>
            </NuxtLink>
        </div>

        <div class="relative h-fit min-h-72">
            <h1 aria-hidden="true" class="text-5xl mb-6 font-extralight">{{ name + t('space') + suffix }}</h1>
            <SplitLine></SplitLine>
            <label for="relativeTime">
                <span tabindex="1" class="sr-only">{{ relativeDaysSR }}</span>
            </label>
            <div id="relativeTime" aria-hidden="true" class="my-4">
                <span class="relative text-8xl font-thin">{{ relativeDays }}</span>
                <span>{{ t('space') }}</span>
                <span class="relative text-3xl leading-12 ml-1 font-extralight">{{ unit }}</span>
            </div>
            <button tabindex="2" v-if="!confirmDelete" @click="confirmDelete = true"
                class="border-2 border-black dark:border-white hover:bg-[#FF0000] hover:border-[#FF0000] dark:hover:border-[#FF0000] duration-200 px-4 py-2 rounded-md mt-4">
                {{ t('delete') }}
            </button>
            <div role="listbox">
                <button tabindex="2" role="option" v-if="confirmDelete" @click="deleteEvent"
                    class="border-2 border-black dark:border-white hover:bg-[#FF0000] hover:border-[#FF0000] dark:hover:border-[#FF0000] duration-200 px-4 py-2 rounded-md mt-4">
                    {{ t('deleteConfirm') }}
                </button>

                <button tabindex="2" role="option" v-if="confirmDelete" @click="confirmDelete = false"
                    class="ml-2 border-2 border-black dark:border-white hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black hover:dark:border-white duration-200 px-4 py-2 rounded-md mt-4">
                    {{ t('cancelDelete') }}
                </button>
            </div>
        </div>
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

.icon path {
    stroke: black;
}

@media (prefers-color-scheme: dark) {
    .icon path {
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
const suffix = isFuture ? t('remain') : t('past');
const relativeDays = isFuture ? Math.ceil(nextDate.diff(moment(), 'days', true)) : Math.ceil(moment().diff(nextDate, 'days', true));
const relativeDaysSR = name + t('space') + suffix + t('daysSR').replaceAll('%d', relativeDays.toString());
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
    daysSR: '%d days.'
    day: 'day'
    days: 'days'
    remain: 'in:'
    past: 'has passsed:'
    unitMargin: '2.75rem'
    delete: 'Remove Event'
    deleteConfirm: 'Confirm to Remove'
    cancelDelete: 'Cancel'
    back: 'Back'
zh-CN:
    later: "后"
    ago: "前"
    space: ''
    daysSR: '%d 天'
    day: '天'
    days: '天'
    remain: '还有：'
    past: '已过：'
    unitMargin: '2.55rem'
    delete: '删除事件'
    deleteConfirm: '确认删除'
    cancelDelete: '取消删除'
    back: '返回'
ja:
    later: "後で"
    ago: "前"
    space: ''
    daysSR: '%d 日'
    day: '日'
    days: '日'
    remain: 'まであと：'
    past: 'が過ぎた：'
    unitMargin: '2.55rem'
    delete: '削除'
    deleteConfirm: '本当に削除しますか？'
    cancelDelete: 'キャンセル'
    back: '戻る'
</i18n>