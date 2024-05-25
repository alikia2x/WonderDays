<template>
    <div>
        <HeaderBar :title="t('newEvent')" />
        <h1>{{ t('newEvent') }}</h1>
        <form v-on:keydown.enter.prevent="nothing" @submit.prevent="() => { ; }">
            <label for="name">
                <h2>{{ t('eventName') }}</h2>
            </label>
            <input v-model="formData.name" id="name" autocomplete="off" :placeholder="t('name')">
            <label for="date">
                <h2>{{ t('date') }}</h2>
            </label>
            <input v-model="formData.date" type="date" id="date">
            <label for="time">
                <h2 class="flex items-center">
                    <span>{{ t('time') }}</span>
                    <span class="ml-2 mt-[0.0625rem] px-[0.3125rem] py-[0.125rem] rounded text-xs font-normal 
         bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 text-zinc-700 align-middle">
                        {{ t('optional') }}
                    </span>
                </h2>
            </label>
            <input v-model="formData.time" type="time" id="time">
            <h2>{{ t('style') }}</h2>
            <ColorPicker v-model:bgColor="formData.bgColor" v-model:borderColor="formData.borderColor" />
            <!-- <div class="block relative h-24">
            <h2>{{ t('repeat') }}</h2>
            <label>
                <span class="sr-only">{{ t('repeatNum') }}</span>
                <input v-model="formData.repeatNum" type="number" class="repeat-number" min="0" max="999" step="1" id="repeatNum"
                    pattern="\d+">
            </label>
        </div> -->
            <p role="alert" class="w-fit bg-[#ff0000] text-xl px-2 text-white">{{ errInfo }}</p>
            <button @click.prevent="addEvent" type="submit">{{ t('submit') }}</button>
        </form>
    </div>

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
    padding-left: 0.25rem;
    height: 2.25rem;
    margin-top: 0.5rem;
    border-width: 2px;
    border-color: #D4D4D8;
    outline: none;
    transition: all 200ms;
    border-radius: 0.375rem;
    width: 100%;
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
    font-size: 1.25rem;
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

.icon path {
    stroke: black;
}

@media (prefers-color-scheme: dark) {
    input {
        background-color: #171c27;
        border-color: #374151;
    }

    input:focus {
        border-color: #a0a2a6;
    }

    button[type=submit] {
        color: white;
        border: white solid 2px;
    }

    button[type=submit]:hover {
        color: black;
        background-color: white;
    }

    .icon path {
        stroke: white;
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

function nothing() {
    ;
}

const { t } = useI18n({
    useScope: 'local'
})

const formData = ref({
    name: '',
    date: moment().format("YYYY-MM-DD").toString(),
    time: undefined,
    bgColor: 'blue',
    borderColor: 'blue',
    repeatNum: 0,
});


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
    if (formData.value.name.trim() === "") {
        return { valid: false, msg: t('emptyName'), id: 'name' }
    }
    for (let event of parsedEvents) {
        if (event.name.toLowerCase() === formData.value.name.toLowerCase()) {
            return { valid: false, msg: t('nameExist'), id: 'name' }
        }
    }
    return { valid: true, msg: '', id: '' }
}

function addEvent() {
    if (!validate().valid) {
        errInfo.value = validate().msg;
        return;
    }

    let savedDateString = "";
    if (formData.value.time !== undefined) {
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

    const savedEvents = localStorage["events"];
    let newEvents;

    if (savedEvents == undefined) {
        newEvents = [newEvent];
    } else {
        newEvents = JSON.parse(savedEvents);
        newEvents.push(newEvent);
    }

    localStorage.setItem("events", JSON.stringify(newEvents));
    navigateTo('/');
}
</script>


<i18n lang="yaml">
en:
    newEvent: 'New Event'
    eventName: 'Event Name'
    name: 'Name'
    date: 'Date'
    time: 'Time'
    style: 'Style'
    optional: 'Optional'
    repeat: 'Repeat'
    submit: 'Add'
    repeatNum: 'Number of repeat interval'
    nameExist: 'Same event exist.'
    emptyName: 'Name is blank.'
    back: 'Back'
zh-CN:
    newEvent: '添加新事件'
    eventName: '名称'
    name: '名称'
    date: '日期'
    time: '时间'
    style: '样式'
    optional: '选填'
    repeat: '重复'
    submit: '添加'
    repeatNum: '重复间隔的数字'
    nameExist: '该事件已存在'
    emptyName: '请填写名称'
    back: '返回'
ja:
    newEvent: '新しいイベント'
    eventName: 'イベント名'
    name: '名前'
    date: '日付'
    time: '時間'
    style: 'スタイル'
    optional: '任意'
    repeat: '繰り返し'
    submit: '追加'
    repeatNum: '繰り返し間隔の数'
    nameExist: '同じイベントが存在します'
    emptyName: '名前が空白です'
    back: '戻る'
</i18n>
