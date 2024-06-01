<template>
    <HeaderBar :title="t('newEvent')"></HeaderBar>
    <h1 class="text-3xl font-bold">{{ t('newEvent') }}</h1>
    <EventForm :loadData="() => { }" :validate="validate" :submitForm="addEvent" :formData="formData" :errInfo="errInfo"
        :setErrInfo="(info) => errInfo = info" />
</template>

<script setup lang="ts">
import moment from 'moment';

const { t } = useI18n({ useScope: 'local' })

const rawUnit = ['year', 'month', 'week', 'day'];
const unitList = ['year', 'month', 'week', 'day'].map((unit) => t(unit));
const unitMap = new Map(unitList.map((unit, index) => [unit, rawUnit[index]]));

const initForm: formData = {
    name: '',
    date: moment().format("YYYY-MM-DD").toString(),
    time: undefined,
    background: 'blue',
    border: 'blue',
    repeatNum: 0,
    repeatUnit: '',
}

const formData = ref(initForm);
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
    if (!isValidURLcomponent(formData.value.name)) {
        return { valid: false, msg: t('invalidName'), id: 'name' }
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

    let newEvent: CountdownEvent = {
        name: formData.value.name,
        calendar: "gregorian",
        date: formData.value.date,
        repeat: "",
        reminder: [],
        sticker: [],
        background: formData.value.background,
        border: formData.value.border
    }

    if (formData.value.time !== undefined) {
        newEvent.time = formData.value.time;
    }

    if (formData.value.repeatNum > 0) {
        newEvent.repeat = formData.value.repeatNum.toString() + ',' + unitMap.get(formData.value.repeatUnit);
    }

    appendEvent(formData.value.name, newEvent);

    navigateTo('/');
}
</script>


<i18n lang="yaml">
en:
    newEvent: New Event
    nameExist: Same event exist.
    emptyName: Name is blank.
    invalidName: Invalid name
zh-CN:
    newEvent: 添加新事件
    nameExist: 该事件已存在
    emptyName: 请填写名称
    year: 年
    invalidName: "无效名称"
ja:
    newEvent: 新しいイベント
    nameExist: 同じイベントが存在します
    emptyName: 名前が空白です
    invalidName: "無効な名前"
</i18n>
