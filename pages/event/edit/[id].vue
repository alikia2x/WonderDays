<template>
    <HeaderBar :title="t('edit')"></HeaderBar>
    <form v-on:keydown.enter.prevent="nothing" @submit.prevent="() => { ; }">
        <p class="flex lg:block">
            <label for="name" class="grow hidden lg:block">
                <h2 class="inline-flex lg:block">{{ t('eventName') }}</h2>
            </label>
            <input v-model="formData.name" id="name" autocomplete="off" :placeholder="t('name')" class="self-end">
        </p>

        <p class="flex lg:block">
            <label for="date" class="grow">
                <h2 class="inline-flex lg:block">
                    {{ t('date') }}
                </h2>
            </label>
            <input v-model="formData.date" type="date" id="date">
        </p>

        <p class="flex lg:block">
        <div class="grow">
            <h2 class="flex items-center" aria-hidden="true">
                <span aria-hidden="true">{{ t('time') }}</span>
                <Tag :content="t('optional')" aria-hidden="true" />
            </h2>
        </div>
        <input v-model="formData.time" type="time" id="time" :aria-label="t('time') + ', ' + t('optional')">
        </p>


        <h2>{{ t('style') }}</h2>
        <ColorPicker v-model:bgColor="formData.bgColor" v-model:borderColor="formData.borderColor" />
        <div class="block relative h-24">
            <h2>{{ t('repeat') }}</h2>
            <label>
                <span class="sr-only">{{ t('repeatNum') }}</span>
                <input v-model="formData.repeatNum" type="number" class="repeat-number translate-y-[0.0625rem]" min="0"
                    max="999" step="1" value="" id="repeatNum" pattern="\d+">
                <USelect class="bg-[#e3e3e8] dark:bg-[#1c1c1e] rounded-md w-20 inline-flex ml-4" color="white"
                    variant="none" v-model="formData.repeatUnit" :options="unitList" :placeholder="t('unit')" />
            </label>
        </div>
        <p role="alert" class="w-fit bg-[#ff0000] text-xl px-2 text-white">{{ errInfo }}</p>
        <button @click.prevent="addEvent" type="submit">{{ t('submit') }}</button>
    </form>
    <DeleteButton />
</template>

<style>
:root {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

h1 {
    font-size: 1.875rem;
    line-height: 2.5rem;
    font-weight: 700;
}

h2 {
    margin-top: 16px;
    font-size: 1.5rem;
    line-height: 1.75rem;
    line-height: 2rem;
    font-weight: 500;
}

input {
    -webkit-appearance: none;
    appearance: none;
    padding-left: 0.5rem;
    height: 2.125rem;
    margin-top: 0.5rem;
    border-width: 2px;
    border: none;
    background-color: #e3e3e8;
    outline: none;
    transition: all 200ms;
    border-radius: 0.375rem;
    width: 100%;
}

input[type="date"],
input[type="time"] {
    align-self: flex-end;
    width: 10.5rem;
    height: 2.25rem;
    text-align: right;
}

input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    padding-left: 0;

}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

button[type=submit] {
    position: relative;
    width: 5rem;
    height: 2.5rem;
    padding-left: 0;
    font-size: 1rem;
    cursor: pointer;
    color: black;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0.375rem;
    border: black solid 2px;
    margin-top: 1rem;
}

button[type=submit]:hover {
    color: white;
    background-color: black;
}

.repeat-number {
    width: 4rem !important;
    height: 2rem;
    text-align: center;
    padding: none;
}

input:focus {
    border-color: #000;
}

@media (prefers-color-scheme: dark) {
    input {
        background-color: #1c1c1e;
    }

    button[type=submit] {
        color: white;
        border: white solid 2px;
    }

    button[type=submit]:hover {
        color: black;
        background-color: white;
    }
}

@media (min-width: 1024px) {
    input {
        width: 100%;
        height: 2.25rem;
    }

    input[type="date"],
    input[type="time"] {
        text-align: left;
        width: 100%;
    }
}

/* Hide spans with this class becuase they're for screen readers */
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
</style>

<script setup lang="ts">
import moment from 'moment';
import Tag from '~/components/tag.vue';

function nothing() { ; }
definePageMeta({
    layout: 'detail-page'
})
const { t } = useI18n({ useScope: 'local' })

const rawUnit = ['day', 'week', 'month', 'year'];
const unitList = ['day', 'week', 'month', 'year'].map((unit) => t(unit));
const unitTolocale = new Map(rawUnit.map((unit, index) => [unit, unitList[index]]));
const localeToUnit = new Map(unitList.map((unit, index) => [unit, rawUnit[index]]));

const formData = ref({
    name: '',
    date: moment().format("YYYY-MM-DD").toString(),
    time: undefined,
    bgColor: 'blue',
    borderColor: 'blue',
    repeatNum: 0,
    repeatUnit: '',
});

let event: CountdownEvent | null = null;
if (localStorage['events'] !== undefined) {
    const parsedEvents: CountdownEvent[] = JSON.parse(localStorage['events']);
    event = parsedEvents.find((event) => event.name === useRoute().params.id) ?? null;
}

if (event !== null) {
    formData.value.name = event.name;
    formData.value.date = event.date;
    formData.value.bgColor = event.background;
    formData.value.borderColor = event.border;
    if (event.repeat!==""){
        const repeatInterval = event.repeat.split(",")[0];
        const repeatUnit = event.repeat.split(",")[1];
        formData.value.repeatNum = parseInt(repeatInterval);
        formData.value.repeatUnit = unitTolocale.get(repeatUnit)!;
    }
    if (moment(event.date).creationData().format === 'YYYY-MM-DD') {
        formData.value.date = moment(event.date).format('YYYY-MM-DD');
    } else {
        formData.value.date = moment(event.date).format('YYYY-MM-DD');
        formData.value.time = moment(event.date).format('HH:mm');
    }
}

watch(formData.value, async (newData, oldData) => {
    if (!validate().valid) {
        errInfo.value = validate().msg;
        document.getElementById(validate().id)?.setAttribute('aria-invalid', 'true');
        return;
    }
    else {
        errInfo.value = '';
    }
})

const errInfo = ref('');

function validate() {
    const storedEvents = localStorage['events'];
    if (storedEvents === undefined) {
        return { valid: true, msg: '', id: '' };
    }
    const parsedEvents: CountdownEvent[] = JSON.parse(storedEvents);
    return { valid: true, msg: '', id: '' }
}

function addEvent() {
    if (!validate().valid) {
        errInfo.value = validate().msg;
        return;
    }

    let savedDateString = "";
    if (formData.value.time) {
        savedDateString = formData.value.date + ' ' + formData.value.time;
        savedDateString = moment(savedDateString).format("YYYY-MM-DD HH:mm:ss").toString();
    }
    else {
        savedDateString = formData.value.date;
        savedDateString = moment(savedDateString).format("YYYY-MM-DD").toString();
    }

    let newEvent = {
        name: formData.value.name,
        calendar: "gregorian",
        date: savedDateString,
        repeat: "",
        reminder: [],
        sticker: [],
        background: formData.value.bgColor,
        border: formData.value.borderColor
    }

    if (formData.value.repeatNum > 0) {
        newEvent.repeat = formData.value.repeatNum.toString() + ',' + localeToUnit.get(formData.value.repeatUnit);
    }
    
    const savedEvents = localStorage["events"];
    let newEvents: CountdownEvent[] = [];

    if (savedEvents == undefined) {
        newEvents = [newEvent];
    } else {
        newEvents = JSON.parse(savedEvents);
        newEvents = newEvents.filter((event) => event.name !== formData.value.name);
        newEvents.push(newEvent);
    }

    localStorage.setItem("events", JSON.stringify(newEvents));
    location.href = "/event/" + formData.value.name;
}
</script>


<i18n lang="yaml">
en:
    newEvent: New Event
    eventName: Event Name
    name: Name
    date: Date
    time: Time
    style: Style
    optional: Optional
    repeat: Repeat
    submit: Save
    repeatNum: Number of repeat interval
    nameExist: Same event exist.
    emptyName: Name is blank.
    back: Back
    unit: Unit
    day: Day
    week: Week
    month: Month
    year: Year
    edit: Edit
zh-CN:
    newEvent: 添加新事件
    eventName: 名称
    name: 名称
    date: 日期
    time: 时间
    style: 样式
    optional: 选填
    repeat: 重复
    submit: 保存
    repeatNum: 重复间隔的数字
    nameExist: 该事件已存在
    emptyName: 请填写名称
    back: 返回
    unit: 单位
    day: 天
    week: 周
    month: 月
    year: 年
    edit: 编辑
ja:
    newEvent: 新しいイベント
    eventName: イベント名
    name: 名前
    date: 日付
    time: 時間
    style: スタイル
    optional: 任意
    repeat: 繰り返し
    submit: 保存
    repeatNum: 繰り返し間隔の数
    nameExist: 同じイベントが存在します
    emptyName: 名前が空白です
    back: 戻る
    unit: 単位
    day: 日
    week: 週
    month: 月
    year: 年
    edit: 編集
</i18n>