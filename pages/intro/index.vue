<template>
    <WelcomeText />
    <p class="mt-4">{{ t('intro')  }}</p>
</template>

<script setup lang="ts">
const { t } = useI18n({
    useScope: 'local'
})
</script>

<i18n lang="yaml">
en:
    title: "Welcome"
    intro: "Welcome to WonderDays. A simple, elegant countdown timer for life's significant milestones. Start anticipating your special days now!"
zh-CN:
    title: "欢迎"
    intro: "欢迎使用 WonderDays。"
ja:
    title: "ようこそ"
    intro: ""
</i18n>