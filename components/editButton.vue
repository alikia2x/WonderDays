<template>
    <div class="relative flex items-center justify-center text-xl lg:text-3xl cursor-pointer w-12 h-12">
        <a tabindex="0" :aria-label="t('edit')" :href="`/event/${props.eventId}/edit`" class="flex items-center justify-center">
            <span class="relative">{{ t('edit') }}</span>
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