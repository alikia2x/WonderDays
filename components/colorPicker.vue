<template>
    <ClientOnly>
        <h3 class="mt-3 mb-2 text-xl leading-7">Background Color</h3>
        <div class="flex flex-wrap gap-6">
            <div v-for="(bg, n) in bgPlaette" :key="n">
                <div @click="setBgColor(n)" class="h-14 w-14 mr-3 relative rounded-lg cursor-pointer colorBox" :style="{
                    backgroundColor: bg,
                    borderWidth: '0.2rem',
                    borderColor: adjustLuminance(bg, inject('darkMode').value ? 2 : -0.1),
                    scale: bgColor == n ? 1.1 : 1
                }"></div>
            </div>
        </div>
        <h3 class="mt-5 mb-2 text-xl leading-7">Border Color</h3>
        <div class="flex flex-wrap gap-6">
            <div v-for="(border, n) in borderPlaette" :key="n">
                <div @click="setBorderColor(n)" class="h-14 w-14 mr-3 relative rounded-lg cursor-pointer colorBox" :style="{
                    backgroundColor: adjustLuminance(border, inject('darkMode').value ? -0.4 : 0.06),
                    borderWidth: '0.2rem',
                    borderColor: border,
                    scale: borderColor == n ? 1.1 : 1
                }"></div>
            </div>
        </div>
    </ClientOnly>
</template>

<style>
.colorBox {
    transition-duration: .2s;
}

.colorBox:hover {
    scale: 1.05;
}
</style>

<script setup>
const bgColor = defineModel('bgColor');
const borderColor = defineModel('borderColor');
const bgPlaette = inject("backgroundPlaette");
const borderPlaette = inject("borderPlaette");

function setBgColor(t) {
    bgColor.value = t;
}

function setBorderColor(t) {
    borderColor.value = t;
}
</script>