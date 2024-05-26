<template>
    <button tabindex="2" v-if="!confirmDelete" @click="confirmDelete = true"
        class="border-2 border-black dark:border-white hover:bg-[#FF0000] hover:border-[#FF0000] dark:hover:border-[#FF0000] hover:text-white duration-200 px-4 py-2 rounded-md mt-4">
        {{ t('delete') }}
    </button>
    <div role="listbox">
        <button tabindex="2" role="option" v-if="confirmDelete" @click="confirmDelete = false"
            class="border-2 border-black dark:border-white hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black hover:dark:border-white duration-200 px-4 py-2 rounded-md mt-4">
            {{ t('cancelDelete') }}
        </button>
        <button tabindex="2" role="option" v-if="confirmDelete" @click="deleteEvent"
            class="ml-2 border-2 border-black dark:border-white hover:bg-[#FF0000] hover:border-[#FF0000] dark:hover:border-[#FF0000] hover:text-white duration-200 px-4 py-2 rounded-md mt-4">
            {{ t('deleteConfirm') }}
        </button>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const confirmDelete = ref(false);
const route = useRoute();
const name = route.params.id as string;
if (getEvent(name).code) {
    location.href = "/";
}
const deleteEvent = () => {
    let events: CountdownEvent[] = JSON.parse(localStorage.getItem('events') || '[]');
    events = events.filter((e) => e.name !== name);
    localStorage.setItem('events', JSON.stringify(events));
    location.href = "/";
};
</script>

<i18n lang="yaml">
en:
    delete: Remove Event
    deleteConfirm: Confirm to Remove
    cancelDelete: Cancel
zh-CN:
    delete: 删除事件
    deleteConfirm: 确认删除
    cancelDelete: 取消删除
ja:
    delete: 削除
    deleteConfirm: 本当に削除しますか？
    cancelDelete: キャンセル
</i18n>