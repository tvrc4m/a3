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
                        <el-card v-if="showBreadcrumb">
                            <breadcrumb :links="breadcrumbNameMap"></breadcrumb>
                        </el-card>
                        <router-view></router-view>
                    </el-main>
                </el-col>
            </el-row>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { mapState } from 'vuex'


    import GlobalHeader from '@/components/global/header.vue'
    import sidebar from '@/components/global/sidebar.vue'
    import AntIcon from '@/components/common/anticon'
    import breadcrumb from '@/components/common/breadcrumb'

    @Component({
        components:{
            GlobalHeader,
            sidebar,
            AntIcon,
            breadcrumb
        },
    })
    export default class LayoutBasic extends Vue{

        get breadcrumbNameMap(){
            return this.$store.state.breadcrumbs
        }

        get showBreadcrumb(){
            return this.$store.state.showBreadcrumb
        }

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

        @Watch("$route.name")
        changeRoute(val){
            this.$store.commit("setBreadcrumb",[])
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

