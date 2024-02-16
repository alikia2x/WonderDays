<template>
    <div :style="{ background: getColor().background, border: getColor().border, borderWidth: '0.4rem', borderLeftStyle: 'solid' }"
        class="darkMo min-h-28 mb-7 relative pl-4 pb-4 pt-1 rounded-r-lg">
        <h2 class="text-2xl font-bold leading-10">{{ event.name }}</h2>
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
            class="absolute h-full border-[#3636365B] dark:border-[#C9C9C95B] border-l-2 border-dashed w-1/4 lg:1/5 xl:w-1/6 min-w-32 top-0 right-0">
            <div class="relative text-center flex flex-col w-full top-1/2 translate-y-[-50%]">
                <!-- Number part -->
                <label>
                    <span class="sr-only">
                        {{ getCardDate(event)[0].toString() + getCardDate(event)[1] + (isFuture ? t('later') : t('ago')) }}
                    </span>
                    <span aria-hidden="true" class="ddin relative text-6xl">
                        {{ getCardDate(event)[0] }}
                    </span>
                </label>

                <!-- Unit part -->
                <div class="relative text-base">
                    <span aria-hidden="true" id="relativeTimeUnit">{{ getCardDate(event)[1] }}</span>
                    <span>{{ t('space') }}</span>
                    <span aria-hidden="true" id="relativeTimeWord" v-if="isFuture">{{ t('later') }}</span>
                    <span aria-hidden="true" id="relativeTimeWord" v-else>{{ t('ago') }}</span>
                </div>
            </div>
        </div>
        <div class="absolute top-0 h-full right-1/4 lg:right-[20%] xl:right-[16.667%] w-40">
            <nuxt-icon v-for="s in event.sticker" :name="s" class="absolute bottom-0 text-9xl" filled></nuxt-icon>
        </div>
    </div>
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

.ddin {
    font-family: DDIN, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
</style>
  
<script setup lang="ts">
import moment from 'moment';
const props = defineProps<{
    event: {
        name: string,
        calendar: string,
        date: string,
        repeat: string,
        reminder: string[],
        background: string,
        border: string,
        sticker: string[],
    },
}>()
const backgroundPalette = inject('backgroundPlaette') as any;
const borderPalette = inject('borderPlaette') as any;
const isRepeat = props.event.repeat != "";
const hasReminder = props.event.reminder.length != 0;
const nextDate = getLatestRepeat(props.event);
console.log(moment("2023/01/01").fromNow());

let nextDateString = "";
if (nextDate && nextDate.creationData().format === 'YYYY-MM-DD') {
    nextDateString = nextDate.format('ll');
} else{
    nextDateString = nextDate.format('lll')
}
const isFuture = nextDate.isAfter(moment());
const { t } = useI18n({ useScope: 'local' });

console.log(moment.locales())

const getColor = () => {
    return {
        "background": backgroundPalette.value[props.event.background],
        "border": borderPalette.value[props.event.border]
    }
}
</script>

<i18n lang="yaml">
en:
    later: "later"
    ago: "ago"
    space: ' '
zh-CN:
    later: "后"
    ago: "前"
    space: ''
ja:
    later: "後で"
    ago: "前"
    space: ''
</i18n>
