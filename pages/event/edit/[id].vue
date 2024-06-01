<template>
    <HeaderBar :title="t('edit')"></HeaderBar>
    <EventForm :loadData="loadData" :validate="validate" :submitForm="submitForm" :formData="formData"
        :errInfo="errInfo" :setErrInfo="(info) => errInfo = info" />
    <DeleteButton />
</template>

<style scoped>
@import url('../../../assets/css/eventForm.css');
</style>

<script setup lang="ts">
import dayjs from 'dayjs';

definePageMeta({
    layout: 'detail-page'
});

const { t } = useI18n({ useScope: 'local' });
const router = useRouter();
const route = useRoute();

const rawUnit = ['year', 'month', 'week', 'day'];
const unitList = ['year', 'month', 'week', 'day'].map((unit) => t(unit));
const unitTolocale = new Map(rawUnit.map((unit, index) => [unit, unitList[index]]));
const localeToUnit = new Map(unitList.map((unit, index) => [unit, rawUnit[index]]));

const initForm: formData = {
    name: '',
    date: dayjs().format("YYYY-MM-DD"),
    time: undefined,
    background: 'blue',
    border: 'blue',
    repeatNum: 0,
    repeatUnit: '',
}

const formData = ref(initForm);
const errInfo = ref('');
const eventName = route.params.id as string;

function loadData() {
    const getEventResult = getEvent(eventName);
    if (getEventResult.code) return;
    const event = getEventResult.data!;
    formData.value.name = event.name;
    formData.value.date = event.date;
    formData.value.background = event.background;
    formData.value.border = event.border;
    if (event.repeat !== "") {
        const repeatInterval = event.repeat.split(",")[0];
        const repeatUnit = event.repeat.split(",")[1];
        formData.value.repeatNum = parseInt(repeatInterval);
        formData.value.repeatUnit = unitTolocale.get(repeatUnit)!;
    }
    if (event.time !== undefined) {
        formData.value.date = dayjs(event.date).format('YYYY-MM-DD');
        formData.value.time = event.time;
    } else {
        formData.value.date = dayjs(event.date).format('YYYY-MM-DD');
    }
}

watch(formData.value, async () => {
    if (!validate().valid) {
        errInfo.value = validate().msg;
        document.getElementById(validate().id)?.setAttribute('aria-invalid', 'true');
        return;
    }
    else {
        errInfo.value = '';
    }
})

function validate() {
    const storedEvents = localStorage['events'];
    if (storedEvents === undefined) {
        return { valid: true, msg: '', id: '' };
    }
    if (!isValidURLcomponent(formData.value.name)) {
        return { valid: false, msg: t('invalidName'), id: 'name' }
    }
    return { valid: true, msg: '', id: '' }
}

function submitForm() {
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
        background: formData.value.background,
        border: formData.value.border
    }

    if (formData.value.time !== undefined) {
        newEvent.time = formData.value.time;
    }

    if (formData.value.repeatNum > 0) {
        newEvent.repeat = formData.value.repeatNum.toString() + ',' + localeToUnit.get(formData.value.repeatUnit);
    }

    modifyEvent(eventName, newEvent);

    router.go(-1);
}
</script>


<i18n lang="yaml">
en:
    edit: Edit
    invalidName: Invalid name
zh-CN:
    edit: 编辑
    invalidName: 无效名称
ja:
    edit: 編集
    invalidName: 無効な名前
</i18n>