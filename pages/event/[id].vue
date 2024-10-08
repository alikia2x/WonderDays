<template>
    <HeaderBar :title="name">
        <EditButton class="cursor-pointer flex flex-1 justify-end items-end" :event-id="name" />
    </HeaderBar>
    <div>
        <div class="relative min-h-screen">
            <label for="relativeTime">
                <span tabindex="1" class="sr-only">{{ relativeDaysSR }}</span>
            </label>
            <div
                class="relative 2xst:top-8 xst:top-16 top-[calc(40vh-8rem)] left-1/2 -translate-x-1/2 h-fit w-full text-center">
                <span class="relative text-9xl font-[Inter] font-extralight" v-html="remainDays">
                </span>
                <!-- Split Line -->
                <div class="relative top-4 w-5/6 lg:w-1/2 max-w-96 lg:max-w-none left-1/2 
                -translate-x-1/2 h-[0.125rem] bg-zinc-400 dark:bg-zinc-500" />
                <p class="relative top-6">
                    <span class="text-xl">{{ name }}</span><br>
                    <span class="text-sm">{{ nextDateString }}</span>
                </p>
                <p v-if="isRepeat" class="relative top-7 text-sm">
                    <span>{{ t('repeat') }}{{ repeatDisplay }}</span>,
                    <span>{{ t('startFrom').replace('%s', `${rawDateString}`) }}</span>
                </p>
            </div>
            <!-- <div class="relative top-[40vh]">
                <UnitTimePill />
            </div> -->
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
</style>

<script setup lang="ts">
import moment from 'moment';
import { onUnmounted } from "vue";
definePageMeta({ layout: 'detail-page' });
const route = useRoute();
const name = route.params.id as string;
if (getEvent(name).code) {
    location.href = "/";
}
const { t } = useI18n({ useScope: 'local' });
const event = getEvent(name).data as CountdownEvent;
const nextDate = getLatestRepeat(event);
const isRepeat = event.repeat != "";
let repeatNumber: number | null = null;
let repeatUnit: string | null = null;
let repeatDisplay: string | null = null;
if (isRepeat) {
    repeatNumber = parseInt(event.repeat.split(',')[0]);
    repeatUnit = event.repeat.split(',')[1];
    repeatDisplay = moment.duration(repeatNumber, repeatUnit as any).humanize();
}
const isFuture = nextDate.isAfter(moment());
const suffix = isFuture ? t('remain') : t('past');
const remainDays = ref(getDisplayDays());

let relativeDays = isFuture ? Math.ceil(nextDate.diff(moment(), 'days', true)) : Math.ceil(moment().diff(nextDate, 'days', true));
let relativeDaysSR = name + t('space') + suffix + t('daysSR').replaceAll('%d', relativeDays.toString());
let rawDateString = "";
let nextDateString = "";


if (event.time) {
    rawDateString = moment(event.date + " " + event.time).format('lll');
    nextDateString = moment(nextDate.format("YYYY-MM-DD") + " " + event.time).format('lll');
} else {
    rawDateString = moment(event.date).format('ll');
    nextDateString = nextDate.format('ll');
}

function transformNumber(num: number): string {
    let numStr: string = num.toString();
    numStr = numStr.replace(/6/g, '<span style="font-feature-settings: \'ss01\'">6</span>');
    numStr = numStr.replace(/9/g, '<span style="font-feature-settings: \'ss01\'">9</span>');
    return numStr;
}

function getDisplayDays(): string{
    if (getCardDate(event) === 0) {
        return t('today');
    }
    return transformNumber(getCardDate(event));
}

let updateTimer = setInterval(() => {
    remainDays.value = getDisplayDays();
}, 1000);


onUnmounted(() => {
    clearInterval(updateTimer);
})
</script>

<i18n lang="yaml">
en:
    later: later
    ago: ago
    space: " "
    daysSR: "%d days."
    day: day
    days: days
    unitMargin: 2.75rem
    delete: Remove Event
    deleteConfirm: Confirm to Remove
    cancelDelete: Cancel
    back: Back
    repeat: "Repeat:"
    startFrom: "Start from %s"
    today: Today
zh-CN:
    later: 后
    ago: 前
    space: " "
    daysSR: "%d 天"
    day: 天
    days: 天
    remain: 还有：
    past: 已过：
    unitMargin: 2.55rem
    delete: 删除事件
    deleteConfirm: 确认删除
    cancelDelete: 取消删除
    back: 返回
    repeat: "重复: "
    startFrom: "始于 %s"
    today: 今天
ja:
    later: 後で
    ago: 前
    space: " "
    daysSR: "%d 日"
    day: 日
    days: 日
    remain: まであと：
    past: が過ぎた：
    unitMargin: 2.55rem
    delete: 削除
    deleteConfirm: 本当に削除しますか？
    cancelDelete: キャンセル
    back: 戻る
    repeat: "繰り返し: "
    startFrom: "%s 開始"
    today: 今日
</i18n>
