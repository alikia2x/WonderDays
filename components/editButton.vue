<template>
    <div class="relative  text-xl lg:text-3xl self-center w-12 items-center overflow-hidden cursor-pointer">
        <a tabindex="0" :aria-label="t('back')" :href="`/event/${props.eventId}/edit`">
            <span class="relative text-xl">{{ t('edit') }}</span>
        </a>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
const props = defineProps<{
    eventId: string;
}>();
</script>

<i18n lang="yaml">
en:
    edit: 'Edit'
zh-CN:
    edit: '编辑'
ja:
    edit: '編集'
</i18n>