<template>
    <div class="backdrop-blur-lg fixed top-0 h-14 left-0 w-full">
        <div class="relative top-0 h-14 pb-10 w-[calc(100%-4rem)] lg:mx-0 lg:w-3/4 xl:2/3 2xl:w-1/2 left-8 lg:left-[12.5%] xl:left-[16.666667%] 2xl:left-1/4
            ">
            
            <div class="flex pt-3">
                <BackButton class="cursor-pointer flex flex-1 justify-start items-start"/>
                <h1 class="flex justify-center items-center text-2xl item-center top-0 relative">{{ title }}</h1>
                <EditButton class="cursor-pointer flex flex-1 justify-end items-end":event-id="title" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>