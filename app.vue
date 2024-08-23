<template>
    <Teleport to="head">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta v-if="darkMode" name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta v-else name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="format-detection" content="telephone=no" />
    </Teleport>
    <NuxtPwaManifest />
    <div class="w-full h-fit bg-white text-black dark:bg-black dark:text-white darkMo">
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
const mql = window.matchMedia('(prefers-color-scheme: dark)');
updateDarkMode(mql);
mql.onchange = (e) => updateDarkMode(e);
provide('darkMode', darkMode);
provide('backgroundPlaette', backgroundPalette);
provide('borderPlaette', borderPalette);

// Initilize i18n
setLang();
initMomentLocale();
moment.locale(getLang());

useSeoMeta({
    title: 'WonderDays',
    ogTitle: 'WonderDays',
    description: "WonderDays: Your personal event countdown. Cherish moments with a simple, elegant countdown timer for life's significant milestones. Start anticipating your special days now!",
    ogDescription: "Wonderdays: Your personal event countdown. Cherish moments with a simple, elegant countdown timer for life's significant milestones. Start anticipating your special days now!",
});
</script>