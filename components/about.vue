<template>
    <p>
        <span>
            WonderDays 1.3.4 &nbsp;
        </span>
        <a class="dark:text-[#34FF7E] dark:hover:text-green-500 text-green-600 hover:text-green-700 duration-200" href="https://github.com/alikia2x/wonderdays">
            GitHub
        </a>
    </p>
    <p>
        {{ t('warning') }}
    </p>
</template>

<script setup lang="ts">
const { t } = useI18n({
    useScope: 'local'
})
</script>

<i18n lang="yaml">
en:
    warning: 'This is an early preview version of WonderDays and there may be problems with the application. To prevent your data from being lost, you can click the button below to download a current backup of your local data for import.'
zh-CN:
    warning: '这这是WonderDays的早期预览版本，应用可能出现问题。为了防止您的数据丢失，您可以点击下面的按钮下载当前本地数据的备份以供导入。'
ja:
    warning: 'これはWonderDaysの初期プレビュー版であり、アプリケーションに問題がある可能性があります。 あなたのデータが失われるのを防ぐために、下のボタンをクリックしてインポート用のローカルデータの現在のバックアップをダウンロードすることができます。'
</i18n>