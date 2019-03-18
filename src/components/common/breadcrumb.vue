<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="link in links" :to="link.route">{{link.name}}</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts">
    import { Component,Prop,Vue } from 'vue-property-decorator'
    @Component({})
    export default class breadcrumb extends Vue{
        @Prop() 
        links:Array<{route:string|object,name:string}>=[]

        mounted(){
            console.log(this.links)
        }
    }
</script>