<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: 'app'
    })
</script>
<style scoped>
    #app {
        height: 100vw;
    }
</style>