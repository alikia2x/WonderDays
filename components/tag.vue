<template>
    <span class="ml-2 mt-[0.0625rem] px-[0.3125rem] py-[0.125rem] rounded text-xs font-semibold
         bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 text-zinc-700 align-middle">
        {{ content }}
    </span>
</template>

<script setup lang="ts">
defineProps({
    content: String
});
</script>