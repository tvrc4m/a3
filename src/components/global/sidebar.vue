<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :router="true">
        <div  v-for="(menu,index) in menus">
            <el-menu-item :index="'index_'+index" v-if="!menu.submenus || menu.submenus.length==0" :route="{path:menu.path}">
                <i v-if="menu.icon" :class="'el-icon-'+menu.icon"></i>
                <span slot="title">{{menu.title}}</span>
            </el-menu-item>
            <el-submenu :index="'index_'+index" v-else>
                <template slot="title">
                    <i  :class="'el-icon-'+menu.icon"></i>
                    <span>{{menu.title}}</span>
                </template>
                <el-menu-item v-for="(submenu,subindex) in menu.submenus" :route="{path:submenu.path}" :index="index+'_'+subindex">{{submenu.title}}</el-menu-item>
            </el-submenu>
        </div>
    </el-menu>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    
    @Component({})
    export default class Sidebar extends Vue{

        @Provide() menus=[
            {
                title:"首页",
                path:"/",
                icon:"menu"
            },
            {
                title:"后台账户",
                icon:"menu",
                submenus:[
                    {
                        title:"后台账户列表",
                        path:"/admin"
                    },
                    {
                        title:"角色列表",
                        path:"/admin/rule"
                    },
                    {
                        title:"权限设置",
                        path:"/admin/rule/setting"
                    }
                ]
            },
            {
                title:"企业管理",
                icon:"menu",
                submenus:[
                    {
                        title:"企业列表",
                        path:"/company"
                    },
                    {
                        title:"企业类型",
                        path:"/company/type"
                    },
                    {
                        title:"企业服务",
                        path:"/company/service"
                    }
                ]
            }
        ]
    }
</script>