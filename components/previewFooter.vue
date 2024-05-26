<template>
    <div v-if="pm">
        <p>
            {{ t('warning') }}
        </p>
        <ExportBackup></ExportBackup>
        <ImportBackup></ImportBackup>
    </div>
</template>

<script setup lang="ts">
import previewMode from '../config';
const { t } = useI18n({
    useScope: 'local'
})
const pm = ref(false);
pm.value = previewMode;
</script>
<i18n lang="yaml">
en:
    warning: "This is an early preview version of WonderDays and there may be problems with the application. To prevent your data from being lost, you can click the button below to download a current backup of your local data for import."
zh-CN:
    warning: "这这是WonderDays的早期预览版本，应用可能出现问题。为了防止您的数据丢失，您可以点击下面的按钮下载当前本地数据的备份以供导入。"
ja:
    warning: "これはWonderDaysの初期プレビュー版であり、アプリケーションに問題がある可能性があります。 あなたのデータが失われるのを防ぐために、下のボタンをクリックしてインポート用のローカルデータの現在のバックアップをダウンロードすることができます。"
</i18n>