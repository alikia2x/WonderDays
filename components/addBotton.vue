<template>
    <NuxtLink
        class="absolute right-0 top-2 px-4 py-[0.35rem] rounded-lg border-2 border-black dark:border-white text-white dark:text-black bg-black dark:bg-white hover:text-black hover:bg-white hover:dark:bg-black hover:dark:text-white hover:border-2 hover:border-black hover:dark:border-white flex items-center"
        to="/addEvent">
        <span class="mr-1">{{ t('add') }}</span>
        <span aria-hidden="true" class="ddin text-3xl font-normal leading-4 mb-[0.125rem]">+</span>
    </NuxtLink>
</template>

<script setup lang="ts">
const { t } = useI18n({
    useScope: 'local'
});
</script>

<i18n lang="yaml">
zh-CN:
    add: "添加"
en:
    add: "Add"
ja:
    add: "追加"
</i18n>
