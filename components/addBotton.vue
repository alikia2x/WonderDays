<template>
    <NuxtLink
        class="absolute right-0 top-2 px-4 py-[0.4rem] rounded-lg text-white dark:text-black bg-gray-950 dark:bg-white flex items-center"
        to="/addEvent">
        <span class="mr-1">{{ t('add') }}</span>
        <span aria-hidden="true" class="ddin text-3xl font-normal leading-4 mb-[0.125rem]">+</span>
    </NuxtLink>
</template>

<script setup>
const { t } = useI18n({
    useScope: 'local'
});
</script>

<i18n lang="yaml">
    zh-CN:
        add: "添加"
    en:
        add: "Add"
</i18n>