<template>
    <div class="w-full h-fit dark:bg-zinc-950 dark:text-white darkMo">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import setLang, { getLang } from './i18n/initI18n';
import initMomentLocale from './i18n/moment';
const darkMode = ref(false);
const backgroundPalette = ref(getPlaette("bg", darkMode.value));
const borderPalette = ref(getPlaette("border", darkMode.value));
const updateDarkMode = (e: any) => {
    darkMode.value = e.matches;
    backgroundPalette.value = getPlaette("bg", e.matches);
    borderPalette.value = getPlaette("border", e.matches);
};

// update Dark mode to using custom plaette
if (process.client) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    updateDarkMode(mql);
    mql.onchange = (e) => updateDarkMode(e);
}
provide('darkMode', darkMode);
provide('backgroundPlaette', backgroundPalette);
provide('borderPlaette', borderPalette);

// Initilize i18n
if (process.client){
    setLang();
    initMomentLocale();
    moment.locale(getLang());
}

useSeoMeta({
    title: 'WonderDays',
    ogTitle: 'WonderDays',
    description: "WonderDays: Your personal event countdown. Cherish moments with a simple, elegant countdown timer for life's significant milestones. Start anticipating your special days now!",
    ogDescription: "Wonderdays: Your personal event countdown. Cherish moments with a simple, elegant countdown timer for life's significant milestones. Start anticipating your special days now!",
})
</script>