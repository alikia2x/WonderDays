<template>
    <p class="mb-8">{{ t('noEvent') }}</p>
</template>

<script setup>
const { t } = useI18n({
    useScope: 'local'
})
</script>

<i18n lang="yaml">
en:
    noEvent: There's no event. Want to add one?
zh-CN:
    noEvent: 目前没有事件。想要添加一个吗？
ja:
    noEvent: イベントがありません。追加しますか？
</i18n>