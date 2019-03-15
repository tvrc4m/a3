<template>
    <el-container class="app-container">
        <el-container>
            <el-header :style="{padding: 0}" height="64px">
                <global-header></global-header>
            </el-header>
            <el-row :span="24">
                <el-col :span="4">
                    <sidebar></sidebar>
                </el-col>
                <el-col :span="20">
                    <el-main :style="{'padding-bottom': 0}">
                        <el-card class="box-card">
                            <router-view :breadcrumbNameMap="breadcrumbNameMap">
                                <div slot="header"></div>    
                            </router-view>
                        </el-card>
                    </el-main>
                </el-col>
            </el-row>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'


    import GlobalHeader from '@/components/global/header.vue'
    import sidebar from '@/components/global/sidebar.vue'
    import AntIcon from '@/components/common/anticon'

    @Component({
        components:{
            GlobalHeader,
            sidebar,
            AntIcon
        }
    })
    export default class LayoutBasic extends Vue{

        
        @Provide() breadcrumbNameMap=[]

        get currentUser():String{
            return 't.wei'
        }

        handleMenuClick(command: string) {
            if (command === 'logout') {
                this.$store.dispatch('login/logout')
            }else if(command === 'user'){

            }else if(command === 'setting'){

            }
        }

        handleLangClick(command:string){
           
        }
    }
</script>

<style lang="scss" scoped>
    .app-container {
        position: relative;
        height: 100vw;
        background: $layout-body-background;
    }
</style>

