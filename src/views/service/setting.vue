<template>
    <el-container>
        <div :is="service"></div>
    </el-container>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import tijian from './tijian/package/index'
    import jiating from './jiating/index'
    @Component({
        components:{
        },
    })
    export default class ServiceSetting extends Vue{

        @Provide() service:any=null;

        mounted(){
            console.log(this.$route.params.alias)
            switch(this.$route.params.alias){
                case 'tijian':
                    this.service = tijian;
                    break;
                case 'jiating':
                    this.service= jiating;
                    break;
            }
        }
    }
</script>