<template>
    <el-container>
        <div is="tijian"></div>
    </el-container>
</template>
<script lang="ts">
    import { Component,Vue } from 'vue-property-decorator'
    @Component({
        components:{
            tijian: ()=>import("./tijian/form.vue")
        },
    })
    export default class ServiceSetting extends Vue{

    }
</script>