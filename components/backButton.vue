<template>
    <div class="flex -translate-x-4 text-xl lg:text-3xl top-2 cursor-pointer">
        <div tabindex="0" :aria-label="t('back')" @click="this.$router.go(-1)">
            <Icon name="ion:chevron-back"></Icon>
            <span class="relative text-2xl top-[1px]">{{ t('back') }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="yaml">
en:
    back: 'Back'
zh-CN:
    back: '返回'
ja:
    back: '戻る'
</i18n>