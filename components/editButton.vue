<template>
    <div class="relative text-xl lg:text-3xl self-center cursor-auto items-center overflow-hidden text-blue-500">
        <div class="h-12 w-20 flex justify-end items-center cursor-pointer">
            <a class="cursor-pointer" tabindex="0" :href="`/event/edit/${props.eventId}`">
                <span class="relative text-lg flex justify-center">{{ t("edit") }}</span>
            </a>
        </div>
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
    edit: Edit
zh-CN:
    edit: 编辑
ja:
    edit: 編集
</i18n>