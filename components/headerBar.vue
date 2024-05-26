<template>
    <div class="backdrop-blur-lg bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(9,9,11,0.85)] fixed top-0 h-14 left-0 w-full z-50">
        <div class="relative top-0 h-14 pb-10 w-[calc(100%-4rem)] lg:mx-0 lg:w-3/4 xl:2/3 2xl:w-1/2 left-8 lg:left-[12.5%] xl:left-[16.666667%] 2xl:left-1/4
            ">
            <div class="flex pt-3">
                <BackButton class="flex flex-1 justify-start items-start text-blue-500" />
                <h1 class="flex felx-1 justify-center items-center text-xl font-medium item-center relative">{{ props.title }}</h1>
                <div class="flex flex-1 justify-end items-end">
                    <slot />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>