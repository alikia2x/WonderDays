<template>
    <NuxtLink :to="`/event/${event.name}`">
        <div :style="{ background: getColor().background, border: getColor().border, borderWidth: '0.4rem', borderLeftStyle: 'solid' }"
            class="darkMo min-h-28 mb-7 relative pl-4 pb-4 pt-1 rounded-r-lg">
            <h2 class="text-2xl font-bold leading-10 w-7/12"> {{ event.name }} </h2>
            <p class="text-gray-600 dark:text-gray-400">
                {{ nextDateString }}
            </p>
            <!-- Indicators -->
            <div class="mt-2">
                <Icon class="mr-2" v-if="isRepeat" name="fa6-solid:repeat" />
                <Icon class="mr-2" v-if="hasReminder" name="fa6-solid:bell" />
            </div>
            <!-- Relative time -->
            <div
                class="absolute h-full border-[#3636365B] dark:border-[#C9C9C95B] border-l-2 border-dashed lg:1/5 xl:w-[18%] min-w-32 w-fit px-4 top-0 right-0">
                <div class="relative text-center flex flex-col w-full top-1/2 translate-y-[-50%]">
                    <!-- Number part -->
                    <label>
                        <span class="sr-only" v-if="getCardDate(event) > 1">
                            {{ getCardDate(event) + t('days') + (isFuture ? t('later') : t('ago')) }}
                        </span>
                        <span class="sr-only" v-else>
                            {{ getCardDate(event) + t('day') + (isFuture ? t('later') : t('ago')) }}
                        </span>
                        <span aria-hidden="true" class="font-[ddin] relative text-6xl font-extralight">
                            {{ getCardDate(event) }}
                        </span>
                    </label>

                    <!-- Unit part -->
                    <div class="relative text-base">
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
            <div class="absolute top-0 h-full right-1/4 lg:right-[20%] xl:right-[16.667%] w-40">
                <nuxt-icon v-for="s in event.sticker" :name="s" class="absolute bottom-0 text-9xl" filled></nuxt-icon>
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

const getColor = () => {
    return {
        "background": backgroundPalette.value[props.event.background],
        "border": borderPalette.value[props.event.border]
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
