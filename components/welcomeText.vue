<template>
    <h1 class="relative h-10 overflow-hidden font-bold flex">
        <div class="relative top-0 h-10 w-10 text-[2.25rem] leading-[2.5rem]">
            👋
        </div>
        <div class="overflow-hidden relative h-10 w-60 text-[2.25rem] leading-[2.5rem]">
            <span class="duration-[0.5s] ease-out absolute" ref="preWord"></span>
            <span class="duration-[0.5s] ease-out absolute translate-y-full" ref="currentWord"></span>
        </div>
    </h1>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const wordList = ["Welcome", "欢迎", "ようこそ", "Bienvenue", "환영합니다", "Bienvenido"];
const preWord = ref<HTMLElement | null>(null);
const currentWord = ref<HTMLElement | null>(null);

function setWords(index: number) {
    if (!preWord.value || !currentWord.value) return;
    preWord.value.innerHTML = wordList[index % wordList.length];
    currentWord.value.innerHTML = wordList[(index + 1) % wordList.length];
}

onMounted(() => {
    let i = 0;

    setWords(i);

    setInterval(() => {
        if (!preWord.value || !currentWord.value) return;

        preWord.value.style.transitionDuration = '0.5s';
        currentWord.value.style.transitionDuration = '0.5s';
        preWord.value.style.transform = 'translateY(-100%)';
        currentWord.value.style.transform = 'translateY(0%)';

        setTimeout(() => {
            if (!preWord.value || !currentWord.value) return;

            preWord.value.style.transitionDuration = '0s';
            currentWord.value.style.transitionDuration = '0s';
            preWord.value.style.transform = 'translateY(0%)';
            currentWord.value.style.transform = 'translateY(100%)';

            setWords(i);
        }, 500);

        i++;
    }, 3000);
})
</script>