<template>
    <div class="relative rounded-full" :style="{
        height: height / 16 + 'rem',
        backgroundColor: inject('darkMode') ? darkColor : color,
        marginBottom: marginY / 16 + 'rem',
        marginTop: marginY / 16 + 'rem'
    }"></div>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: 2,
        },
        color: {
            type: String,
            default: "#656565",
        },
        darkColor: {
            type: String,
            default: "#A1A1A1",
        },
        marginY: {
            type: Number,
            default: 16,
        }
    },
    setup(props) {
        return {
            props
        };
    },
}
</script>
