<template>
    <div class="inline ml-4">
        <input type="file" ref="fileInput" @change="importBackup" style="display: none; width:0;" />
        <button class="mt-2 text-sm rounded-md px-4 py-[0.35rem] border-2
     border-black dark:border-white text-white dark:text-black bg-black dark:bg-white
      hover:text-black hover:bg-white hover:dark:bg-black hover:dark:text-white hover:border-2
       hover:border-black hover:dark:border-white" @click="openFileInput">{{ t('import') }}</button>
    </div>
</template>
  
<script>
export default {
    methods: {
        openFileInput() {
            this.$refs.fileInput.click();
        },
        importBackup(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    try {
                        const fileContent = e.target.result;
                        const jsonData = JSON.parse(fileContent);
                        localStorage.setItem('events', JSON.stringify(jsonData));
                        console.log('Backup imported successfully');
                        location.href = "/";
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                };

                // 读取文件
                reader.readAsText(file);
            }
        },
    },
    setup() {
        const { t } = useI18n({
            useScope: 'local'
        })
        return { t };
    }
};
</script>
  
<i18n lang="yaml">
en:
    import: 'Import'
zh-CN:
    import: '导入'
ja:
    import: 'インポート'
</i18n>