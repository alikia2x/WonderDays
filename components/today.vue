<template>
    <div class="mb-6 h-20 relative">
        <ClientOnly>
            <h1 class="text-3xl mb-1 relative font-bold">
                {{ t('today') }} · {{ dateString }}
            </h1>
            <h2 class="mt-2 eventCount">
                <span v-if="today <= 0 && week <= 0">{{ t('noEvent') }}</span>
                <span v-else-if="today == 1 && week <= 0 || today == 1 && week == 1">{{ t('1event') }}</span>
                <span v-else-if="week == 1 && today <= 0">{{ t('1eventweek') }}</span>
                <span v-else v-html="t('multiple').replace('$wk',`<strong>${week}</strong>`).replace('$td',`<strong>${today}</strong>`)"></span>
            </h2>
        </ClientOnly>
        <AddBotton />
    </div>
</template>

<style>
.eventCount {
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 1.5rem;
}
</style>

<script>
import moment from 'moment';

export default {
    props: {
        today: Number,
        week: Number,
    },
    setup() {
        const { t } = useI18n({
            useScope: 'local'
        });
        let dateString = moment().format(t('dateFormat'));
        return {
            dateString,
            t
        };
    },
}
</script>


<i18n lang="yaml">
en:
    today: "Today"
    dateFormat: "MMM DD"
    1event: "1 Event"
    1eventweek: "1 Event in next seven days"
    events: "Events"
    noEvent: "No Event"
    multiple: "Today's events: $td. Upcoming events in the next seven days: $wk."
zh-CN:
    today: "今天"
    dateFormat: "M月D日"
    1event: "1 个事件"
    1eventweek: "7天内有 1 个事件"
    events: "个事件"
    noEvent: "无事件"
    multiple: "今天有 $td 个事件, 7天内共 $wk 个事件"
</i18n>