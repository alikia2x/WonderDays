<template>
    <div class="mb-6 h-20 relative">
        <h1 class="text-3xl mb-1 relative font-bold" :style="{ 'font-family': t('titleFont')}">
            {{ t('today') }} · {{ dateString }}
        </h1>
        <span class="text-black dark:text-white eventCount text-[0.9rem]"  :style="{ 'font-family': t('titleFont')}">
            <span v-if="today <= 0 && week <= 0">{{ t('noEvent') }}</span>
            <span v-else-if="today == 1 && week <= 0 || today == 1 && week == 1">{{ t('1event') }}</span>
            <span v-else-if="week == 1 && today <= 0">{{ t('1eventweek') }}</span>
            <span v-else
                v-html="t('multiple').replace('$wk', `<strong>${week}</strong>`).replace('$td', `<strong>${today}</strong>`)"></span>
        </span>
        <AddBotton />
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
const props = defineProps<{
    today: number,
    week: number,
}>();
const { t } = useI18n({
    useScope: 'local'
});
let dateString = moment().format(t('dateFormat'));
</script>


<i18n lang="yaml">
en:
    today: Today
    dateFormat: MMM DD
    1event: 1 Event
    1eventweek: 1 Event in next seven days
    events: Events
    noEvent: No event today
    multiple: "Today's events: $td. Upcoming events in the next seven days: $wk."
    titleFont: sans-serif
zh-CN:
    today: 今天
    dateFormat: M月D日
    1event: 1 个事件
    1eventweek: 7天内有 1 个事件
    events: 个事件
    noEvent: 今日无事件
    multiple: "今天有 $td 个事件, 7天内共 $wk 个事件"
    titleFont: serif
ja:
    today: 今日
    dateFormat: M月D日
    1event: 1 イベント
    1eventweek: 次の7日間に1つのイベント
    events: イベント
    noEvent: 今日のイベントはありません
    multiple: "今日のイベント: $td。次の7日間の予定: $wk。"
    titleFont: serif
</i18n>