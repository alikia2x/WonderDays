<template>
    <p>
        <span>
            WonderDays 1.6.4
        </span>
        <a class="font-bold dark:text-[#34FF7E] dark:hover:text-green-500 text-green-600 hover:text-green-700 duration-200"
            href="https://github.com/alikia2x/wonderdays">
            {{ t("sourceCode") }}
        </a>
    </p>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="yaml">
en:
    sourceCode: "Source Code"
zh-CN:
    sourceCode: "源代码"
ja:
    sourceCode: "ソースコード"
</i18n>