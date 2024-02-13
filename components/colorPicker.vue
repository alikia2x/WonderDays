<template>
    <div class="grid">
        <div class="h-10 w-10 relative rounded-lg" v-for="color in bgPlaette" 
        :style="{
            backgroundColor: color,
            borderWidth: '0.125rem', 
            borderColor: getPlaetteBorder(color,0.3)
        }"></div>
    </div>
</template>

<script setup>
const bgColor = defineModel('bgColor');
const borderColor = defineModel('borderColor');
const bgPlaette = inject("backgroundPlaette");
const borderPlaette = inject("borderPlaette");
</script>