<template>
    <el-row>
        <el-card>
            <div slot="header">待办事项</div>
            <ul class="messages">
                <li class="message">
                    <div class="title">健康体检</div>
                    <div class="count">2</div>
                </li>
                <li class="message">
                    <div class="title">健康体检</div>
                    <div class="count">2</div>
                </li>
            </ul>
        </el-card>
    </el-row>
</template>

<script lang="ts">

    import { Component,Provide,Vue } from 'vue-property-decorator'
    
    @Component({})
    export default class HomeIndex extends Vue{
        mounted(){
            this.$store.commit("hideBreadcrumb")
        }
    }
</script>

<style scoped lang="scss">
    .messages{
        display: flex;
        list-style: none;
        .message{
            flex: 0;
            min-width: 99px;
            background-color: #f8f8f8;
            margin:0 10px;
            padding: 5px;
            text-align: center;
            border-radius: 5px;
            &:first-child{
                margin:0 10px 0 0;
            }
            .title{
                padding-bottom: 10px;
                font-size: 14px;
            }
            .count{
                font-style: normal;
                text-align: center;
                font-size: 30px;
                font-weight: 300;
                color: #009688;
            }
        }
    }
</style>
