<template>
    <h3 class="mt-3 mb-2 text-xl leading-7">{{ t('bgColor') }}{{ t(bgColor as string + 'Bg') }}</h3>
    <div class="flex flex-wrap gap-6 h-fit mb-5">
        <div v-for="(bg, n) in bgPlaette" :key="n">
            <div @click="setBgColor(n)" class="h-14 w-14 mr-3 relative rounded-lg cursor-pointer colorBox" :style="{
                backgroundColor: bg,
                borderWidth: '0.2rem',
                borderColor: adjustColor(adjustColor(bg, (darkMode ? 0 : 1.5), 'c'), (darkMode ? 1.5 : -0.1)),
                scale: bgColor == n ? 1.1 : 1
            }"></div>
        </div>
    </div>
    <h3 class="mb-2 text-xl leading-7">{{ t('borderColor') }}{{ t(borderColor as string + 'Border') }}</h3>
    <div class="flex flex-wrap gap-6 h-fit !mb-5">
        <div v-for="(border, n) in borderPlaette" :key="n">
            <div @click="setBorderColor(n)" class="h-14 w-14 mr-3 relative rounded-lg cursor-pointer colorBox" :style="{
                backgroundColor: adjustColor(border, (darkMode ? -0.25 : 0.08)),
                borderWidth: '0.2rem',
                borderColor: border,
                scale: borderColor == n ? 1.1 : 1
            }"></div>
        </div>
    </div>
</template>

<style>
.colorBox {
    transition-duration: .2s;
}

.colorBox:hover {
    scale: 1.05;
}
</style>

<script setup lang="ts">
const bgColor = defineModel('bgColor');
const borderColor = defineModel('borderColor');
const bgPlaette = inject("backgroundPlaette");
const borderPlaette = inject("borderPlaette");
const darkMode = inject("darkMode");
const { t } = useI18n({ useScope: 'local' });

function setBgColor(t: string) {
    bgColor.value = t;
}

function setBorderColor(t: string) {
    borderColor.value = t;
}
</script>

<i18n lang="yaml">
en:
    bgColor: 'Background Color: '
    borderColor: 'Border Color: '
    blueBorder: 'Baby Blue'
    redBorder: 'Frozen Salmon'
    yellowBorder: 'Calamansi'
    blueBg: 'Alice Blue'
    redBg: 'Seashell'
    yellowBg: 'Ivory'
zh-CN:
    bgColor: '背景颜色：'
    borderColor: '边框颜色：'
    blueBorder: '天蓝'
    redBorder: '西瓜红'
    yellowBorder: '米黄'
    blueBg: '爱丽丝蓝'
    redBg: '浅红'
    yellowBg: '象牙色'
ja:
    bgColor: '背景色：'
    borderColor: 'ボーダーカラー：'
    blueBorder: 'ベビーブルー'
    redBorder: '冷凍サーモン'
    yellowBorder: 'カラマンシー'
    blueBg: 'アリスブルー'
    redBg: 'シーシェル'
    yellowBg: 'アイボリー'
</i18n>
