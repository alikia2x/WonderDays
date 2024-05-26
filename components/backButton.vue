<template>
    <div class="flex items-center -translate-x-4 text-2xl lg:text-3xl top-2 cursor-pointer">
        <div tabindex="0" :aria-label="t('back')" @click="this.$router.go(-1)">
            <Icon name="ion:chevron-back" class="inline-block align-middle"></Icon>
            <span class="inline-block align-middle text-xl">{{ t('back') }}</span>
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