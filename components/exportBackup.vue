<template>
    <button class="mt-2 text-sm rounded-md px-4 py-[0.35rem] border-2
     border-black dark:border-white text-white dark:text-black bg-black dark:bg-white
      hover:text-black hover:bg-white hover:dark:bg-black hover:dark:text-white hover:border-2
       hover:border-black hover:dark:border-white"
     @click="downloadBackup">
        {{ t('download') }}
    </button>
</template>
  
<script>
import { consola } from "consola";

export default {
    methods: {
        downloadBackup() {
            const eventsData = localStorage.getItem('events');
            if (eventsData) {
                // Parse the events data and convert it to a pretty-printed JSON string
                const jsonData = JSON.stringify(JSON.parse(eventsData), null, 2);
                // Create a blob from the JSON data
                const blob = new Blob([jsonData], { type: 'application/json' });
                // Generate a URL for the blob
                const url = window.URL.createObjectURL(blob);
                // Create a timestamp to use in the backup file's name
                const timestamp = Math.floor(Date.now() / 1000);
                // Construct the backup file's name
                const fileName = `WonderDays_backup_${timestamp}.json`;
                // Create a temporary anchor element to trigger the download
                const a = document.createElement('a');

                // Set the URL and download attributes for the anchor element
                a.href = url;
                a.download = fileName;
                // Append the anchor element to the document body, click it, and remove it
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // Revoke the blob URL to free up memory
                window.URL.revokeObjectURL(url);
            } else {
                // Log an error message if no events data is found
                consola.error('No events data found in localStorage');
            }
        },
    },
    setup() {
        const { t } = useI18n({
            useScope: 'local'
        })
        return { t };
    },
};
</script>
<i18n lang="yaml">
en:
    download: Download
zh-CN:
    download: 下载
ja:
    download: ダウンロード
</i18n>