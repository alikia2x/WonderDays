<template>
    <div :style="{ background: getBackgroundColor(), border: getBorderColor(), borderWidth: '0.4rem', borderLeftStyle: 'solid'}" >
        <h2 class="text-2xl font-bold leading-10">{{ event.name }}</h2>
        <p class="text-gray-600 dark:text-gray-400">
            {{ nextDateString }}
        </p>
        <div class="mt-2">
            <Icon v-if="isRepeat" name="fa6-solid:repeat" />
            <Icon v-if="hasReminder" name="fa6-solid:bell" />
        </div>
        <!-- 其他 event 相关的显示逻辑 -->
    </div>
</template>

<style>
.nuxt-icon svg{
    fill: none !important;
}

</style>
  
<script>
import { ref, watchEffect } from 'vue';

export default {
    props: {
        event: {
            name: String,
            calendar: String,
            year: Number,
            month: Number,
            day: Number,
            repeat: String,
            reminder: Array,
            background: String,
            border: String,
        },
        darkMode: Boolean,
    },
    setup(props) {
        const backgroundPalette = ref(null);
        const borderPalette = ref(null);
        const localOptions = {
            year: 'numeric',
            month: 'short',
            day: "numeric"
        }
        const isRepeat = props.event.repeat != undefined;
        const hasReminder = props.event.reminder.length != 0;
        let nextDateString = "";
        if (props.event.calendar=="gregorian"){
            let fullDate = new Date();
            fullDate = new Date(props.event.year, props.event.month - 1, props.event.day);
            if (props.event.repeat!=undefined){
                let repeatInterval = props.event.repeat.split(",")[0];
                let repeatUnit = props.event.repeat.split(",")[1];
                while(true){
                    switch(repeatUnit){
                        case "year":
                            fullDate.setFullYear(fullDate.getFullYear()+parseInt(repeatInterval));
                            break;
                        case "month":
                            fullDate.setMonth(fullDate.getMonth()+parseInt(repeatInterval));
                            break;
                        case "day":
                            fullDate.setDate(fullDate.getDate()+parseInt(repeatInterval));
                            break;
                    }
                    if(fullDate.getTime()>=Date.now()){
                        break;
                    }
                }
            }
            nextDateString = fullDate.toLocaleDateString(undefined, localOptions);
        }
        
        // 定义调色板映射
        const darkBackgroundPalette = {
            blue: '#262A35',
        };
        const lightBackgroundPalette = {
            blue: '#3498db',
        };
        const darkBorderPalette = {
            blue: '#7F9DCD',
        };
        const lightBorderPalette = {
            blue: '#3498db',
        };

        // 监听深色模式的变化，更新调色板
        watchEffect(() => {
            backgroundPalette.value = props.darkMode ? darkBackgroundPalette : lightBackgroundPalette;
            borderPalette.value = props.darkMode ? darkBorderPalette : lightBorderPalette;
        });

        const getBackgroundColor = () => {
            return getColorFromPalette(props.event.background,"background");
        };
        const getBorderColor = () => {
            return getColorFromPalette(props.event.border,"border");
        };

        const getColorFromPalette = (keyword, type) => {
            if (backgroundPalette.value && backgroundPalette.value[keyword] || borderPalette.value && borderPalette.value[keyword]) {
                return type === "background" ? backgroundPalette.value[keyword] : borderPalette.value[keyword];
            } else {
                return keyword; // 如果找不到映射，默认返回原值
            }
        };

        return {
            getBackgroundColor,
            getBorderColor,
            nextDateString,
            isRepeat,
            hasReminder
        };
    },
};
</script>