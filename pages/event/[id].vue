<template>
    <HeaderBar :title="name">
        <EditButton class="cursor-pointer flex flex-1 justify-end items-end" :event-id="name" />
    </HeaderBar>
    <div>
        <div class="relative h-screen">
            <label for="relativeTime">
                <span tabindex="1" class="sr-only">{{ relativeDaysSR }}</span>
            </label>
            <div
                class="absolute top-[calc(50%-8rem)] lg:top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 h-fit w-full text-center">
                <span class="relative text-9xl font-[Inter] font-thin" v-html="transformNumber(getCardDate(event))">
                </span>
                <!-- Split Line -->
                <div class="relative top-2 w-5/6 lg:w-1/2 max-w-96 lg:max-w-none left-1/2 
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
let rawDateString = "";
if (moment(event.date).creationData().format === 'YYYY-MM-DD') {
    rawDateString = moment(event.date).format('ll');
} else {
    rawDateString = moment(event.date).format('lll');
}
let repeatNumber: number | null = null;
let repeatUnit: string | null = null;
let repeatDisplay: string | null = null;
if (isRepeat) {
    repeatNumber = parseInt(event.repeat.split(',')[0]);
    repeatUnit = event.repeat.split(',')[1];
    repeatDisplay = moment.duration(repeatNumber,repeatUnit as any).humanize();
}
const isFuture = nextDate.isAfter(moment());
const suffix = isFuture ? t('remain') : t('past');
const relativeDays = isFuture ? Math.ceil(nextDate.diff(moment(), 'days', true)) : Math.ceil(moment().diff(nextDate, 'days', true));
const relativeDaysSR = name + t('space') + suffix + t('daysSR').replaceAll('%d', relativeDays.toString());
let nextDateString = "";
if (nextDate && nextDate.creationData().format === 'YYYY-MM-DD') {
    nextDateString = nextDate.format('ll');
} else {
    nextDateString = nextDate.format('lll')
}

function transformNumber(num: number): string {
    let numStr: string = num.toString();
    numStr = numStr.replace(/6/g, '<span style="font-feature-settings: \'ss01\'">6</span>');
    numStr = numStr.replace(/9/g, '<span style="font-feature-settings: \'ss01\'">9</span>');
    return numStr;
}

const unit = relativeDays > 1 ? t('days') : t('day');
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
</i18n>