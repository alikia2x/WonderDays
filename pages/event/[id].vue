<template>
    <div class="relative text-center w-4/5 left-[10%] h-fit min-h-72">
        <h1 class="text-5xl mb-6 font-extralight">{{ name }}</h1>
        <SplitLine></SplitLine>
        <div class="">
            <div class="relative text-center flex flex-col w-full">
                <!-- Number part -->
                <label>
                    <span class="sr-only">
                        {{
                            relativeDaysSR
                        }}
                    </span>
                    <span aria-hidden="true" class="ddin relative text-9xl">
                        {{ relativeDays }}
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<style>
.ddin {
    font-family: DDIN, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
</style>

<script setup lang="ts">
import moment from 'moment';
const route = useRoute();
const name = route.params.id as string;
if (getEvent(name).code) {
    navigateTo('/');
}
const event = getEvent(name).data as CountdownEvent;
const nextDate = getLatestRepeat(event);
const { t } = useI18n({ useScope: 'local' });

const isFuture = nextDate.isAfter(moment());
const relativeDays = isFuture ? nextDate.diff(moment(), 'days') : moment().diff(nextDate, 'days');
const relativeDaysSR = isFuture ? t('remainDaysSR').replaceAll('%s', relativeDays.toString()) : t('pastDaysSR').replaceAll('%d', relativeDays.toString());
</script>

<i18n lang="yaml">
en:
    later: "later"
    ago: "ago"
    space: ' '
    remainDaysSR: '%s days left.'
    pastDaysSR: '%d days ago.'
zh-CN:
    later: "后"
    ago: "前"
    space: ''
    remainDaysSR: '还有 %s 天'
    pastDaysSR: '%d 天前'
ja:
    later: "後で"
    ago: "前"
    space: ''
    remainDaysSR: '%d 日が残ります。'
    pastDaysSR: '%d 日前'
</i18n>    