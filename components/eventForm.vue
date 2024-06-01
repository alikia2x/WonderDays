<template>
    <form v-on:keydown.enter.prevent="() => {}" @submit.prevent="() => {}">
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
        <ColorPicker v-model:background="formData.background" v-model:border="formData.border" />
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
        <button @click.prevent="props.submitForm" type="submit">{{ t('submit') }}</button>
    </form>
</template>

<style scoped>
@import url('../assets/css/eventForm.css');
</style>

<script setup lang="ts">
import Tag from '~/components/tag.vue';

const { t } = useI18n({ useScope: 'local' });
const unitList = ['year', 'month', 'week', 'day'].map((unit) => t(unit));

const props = defineProps<{
    loadData: Function,
    validate: (data: formData) => { valid: boolean, msg: string, id: string },
    submitForm: Function,
    errInfo: string,
    setErrInfo: (msg: string) => void,
    formData: formData,
}>();

props.loadData();

watch(props.formData, async (newData, oldData) => {
    if (!props.validate(newData).valid) {
        props.setErrInfo(props.validate(newData).msg);
        document.getElementById(props.validate(newData).id)?.setAttribute('aria-invalid', 'true');
        return;
    }
    else {
        props.setErrInfo('');
    }
})
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
        submit: Add
        repeatNum: Number of repeat interval
        nameExist: Same event exist.
        emptyName: Name is blank.
        back: Back
        unit: Unit
        day: Day
        week: Week
        month: Month
        year: Year
    zh-CN:
        newEvent: 添加新事件
        eventName: 名称
        name: 名称
        date: 日期
        time: 时间
        style: 样式
        optional: 选填
        repeat: 重复
        submit: 添加
        repeatNum: 重复间隔的数字
        nameExist: 该事件已存在
        emptyName: 请填写名称
        back: 返回
        unit: 单位
        day: 天
        week: 周
        month: 月
        year: 年
    ja:
        newEvent: 新しいイベント
        eventName: イベント名
        name: 名前
        date: 日付
        time: 時間
        style: スタイル
        optional: 任意
        repeat: 繰り返し
        submit: 追加
        repeatNum: 繰り返し間隔の数
        nameExist: 同じイベントが存在します
        emptyName: 名前が空白です
        back: 戻る
        unit: 単位
        day: 日
        week: 週
        month: 月
        year: 年
    </i18n>
    