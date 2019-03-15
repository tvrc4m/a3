<template>
    <div>
        <div class="card-header" slot="header">
            <span class="title">dashboard</span>
            <div class="actions">
                <el-button type="primary" size="small" @click="clearCode">清除过期验证码</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component,Provide,Vue } from 'vue-property-decorator'
    
    @Component({})
    export default class HomeIndex extends Vue{

    }
</script>

<style scoped lang="css">
    .ram-calc .ram-input{
        width: 80px !important;
        display: inline-block;
    }
    .ram-calc .el-input__inner{
        height: 32px !important;
        line-height: 32px !important;
        width: 80px !important;
    }
</style>
