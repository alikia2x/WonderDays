<template>
    <div class="flex items-center -translate-x-4 top-2">
        <div class="h-12 w-20 flex justify-start -translate-x-3 lg:-translate-x-0 items-center cursor-pointer" tabindex="0"
            :aria-label="t('back')" @click="this.$router.go(-1)" @keyup.enter="this.$router.go(-1)">
            <Icon name="ion:chevron-back"
                class="text-3xl inline-block align-middle h-7 text-black dark:text-white icon"></Icon>
            <span class="inline-block align-middle text-lg">{{ t('back') }}</span>
        </div>
    </div>
</template>

<style>
.icon path {
    stroke: rgb(59 130 246);
}
</style>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="yaml">
en:
    back: Back
zh-CN:
    back: 返回
ja:
    back: 戻る
</i18n>