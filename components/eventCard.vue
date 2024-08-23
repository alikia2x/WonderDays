<template>
    <NuxtLink :to="`/event/${encodeURI(event.name)}`">
        <div :style="{ backgroundColor: getColor().background, border: getColor().border, borderWidth: '0.4rem', borderLeftStyle: 'solid' }"
            class="darkMo min-h-28 mb-7 relative pl-4 py-4 rounded-r-lg flex">
            <!-- Left part -->
            <div class="flex flex-col grow">
                <h2 class="mt-1 text-2xl font-bold leading-10"> {{ event.name }} </h2>
                <p class="text-gray-600 dark:text-gray-400 text-">
                    {{ nextDateString }}
                </p>
                <!-- Indicators -->
                <div v-if="isRepeat || hasReminder" class="mt-2">
                    <Icon class="mr-2" v-if="isRepeat" name="fa6-solid:repeat" />
                    <Icon class="mr-2" v-if="hasReminder" name="fa6-solid:bell" />
                </div>
            </div>
            <!-- Right part -->
            <!-- Relative time -->
            <div class="relative h-full min-w-36 w-fit lg:w-1/5 xl:w-[18%] flex justify-end self-center mr-3 lg:mr-6">
                <div class="relative flex flex-col w-full justify-center items-end">
                    <!-- Number part -->
                    <label>
                        <span class="sr-only" v-if="getCardDate(event) > 1">
                            {{ getCardDate(event) + t('days') + (isFuture ? t('later') : t('ago')) }}
                        </span>
                        <span class="sr-only" v-else>
                            {{ getCardDate(event) + t('day') + (isFuture ? t('later') : t('ago')) }}
                        </span>
                        <span aria-hidden="true" class="font-[ddin] relative leading-[1] text-[3.5rem] md:text-6xl font-extralight">
                            {{ getCardDate(event) }}
                        </span>
                    </label>

                    <!-- Unit part -->
                    <div class="relative text-base mr-1 font-bold">
                        <span aria-hidden="true" id="relativeTimeUnit" v-if="getCardDate(event) > 1">
                            {{ t('days') }}
                        </span>
                        <span aria-hidden="true" id="relativeTimeUnit" v-else>{{ t('day') }}</span>
                        <span v-if="getCardDate(event) !== 0">
                            <span>{{ t('space') }}</span>
                            <span aria-hidden="true" id="relativeTimeWord" v-if="isFuture">{{ t('later') }}</span>
                            <span aria-hidden="true" id="relativeTimeWord" v-else>{{ t('ago') }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<style>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.nuxt-icon svg {
    width: 1em;
    height: 1em;
    margin-bottom: 0em;
    vertical-align: middle;
}

.comfortaa {
    font-family: Comfortaa, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
</style>

<script setup lang="ts">
import moment from 'moment';
import { CountdownEvent } from '~/types/event';
const props = defineProps<{
    event: CountdownEvent
}>()
const backgroundPalette = inject('backgroundPlaette') as any;
const borderPalette = inject('borderPlaette') as any;
const isRepeat = props.event.repeat != "";
const hasReminder = props.event.reminder.length != 0;
const nextDate = getLatestRepeat(props.event);

let nextDateString = "";
if (props.event.time) {
    nextDateString = moment(props.event.date + " " + props.event.time).format('lll');
} else {
    nextDateString = nextDate.format('ll');
}
const isFuture = nextDate.isAfter(moment());
const { t } = useI18n({ useScope: 'local' });
const darkMode: typeof ref<boolean> = inject('darkMode')!;

const getColor = () => {
    const darkBorder = ["#1B68B0", "#C4510C"];
    const lightBorder = ["#42A2FE", "#FF5124"];
    const lightBg = ["#E6F2FF", "#FFF0E6"];
    const darkBg = ["#1F1F2A", "#241D25"];
    
    const bgPlaette = darkMode.value ? darkBg : lightBg;
    const borderPlaette = darkMode.value ? darkBorder : lightBorder;
    return {
        "background": isFuture ? bgPlaette[0] : bgPlaette[1],
        "border": isFuture ? borderPlaette[0] : borderPlaette[1]
    }
}
</script>

<i18n lang="yaml">
en:
    later: later
    ago: ago
    day: day
    days: days
    space: " "
zh-CN:
    later: 后
    ago: 前
    day: 天
    days: 天
    space: ""
ja:
    later: 後で
    ago: 前
    day: 日
    days: 日
    space: ""
</i18n>
