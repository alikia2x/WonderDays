<template>
    <div class="mb-6 h-20">
        <p class="relative text-sm uppercase">
            Today · {{ dateString }}
        </p>
        <h1>
            <span class="text-3xl font-bold">No events</span>
        </h1>
        <AddBotton class="absolute right-4 top-4"/>
    </div>
</template>

<script>
export default {
    setup() {
        let date = new Date();
        const localOptios = {
            month: 'short',
            day: "numeric"
        }
        let dateString = date.toLocaleDateString(undefined, localOptios);
        return {
            dateString
        }
    }
}
</script>