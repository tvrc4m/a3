<template>
    <el-menu ref="sidebar" class="el-menu-vertical-demo" :router="true" :default-active="selected_index">
        <div  v-for="(menu,index) in menus">
            <el-menu-item :index="'index_'+index" :class="activeClass(menu.path,'index_'+index)" v-if="!menu.submenus || menu.submenus.length==0" :route="{path:menu.path}">
                <i v-if="menu.icon" :class="'el-icon-'+menu.icon"></i>
                <span slot="title">{{menu.title}}</span>
            </el-menu-item>
            <el-submenu :index="'index_'+index" v-else>
                <template slot="title">
                    <i  :class="'el-icon-'+menu.icon"></i>
                    <span>{{menu.title}}</span>
                </template>
                <el-menu-item v-for="(submenu,subindex) in menu.submenus" :class="activeClass(submenu.path,'submenu_'+index+'_'+subindex)" :route="{path:submenu.path}" :index="'submenu_'+index+'_'+subindex">{{submenu.title}}</el-menu-item>
            </el-submenu>
        </div>
    </el-menu>
</template>
<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { getAllServices } from '@/api/service'
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
                    }
                ]
            },
            {
                title:"企业管理",
                icon:"menu",
                path:"/company"
                // submenus:[
                //     {
                //         title:"企业列表",
                //         path:"/company"
                //     },
                //     {
                //         title:"企业类型",
                //         path:"/company/type"
                //     }
                // ]
            },
            // {
            //     title:"服务列表",
            //     path:"/service",
            //     group:"service",
            //     icon:"menu",
            //     submenus:[]
            // },
            {
                title:"订单",
                path:"/order",
                icon:"menu",
                submenus:[]
            },
            {
                title:"用户管理",
                path:"/user",
                icon:"menu",
                submenus:[]
            },
            {
                title:"新闻管理",
                path:"/news",
                icon:"menu",
                submenus:[]
            },
            {
                title:"政策速递",
                icon:"menu",
                group:"policy",
                submenus:[
                    {
                        title:"模块",
                        path:"/policy/module"
                    },
                    {
                        title:"新闻",
                        path:"/policy/news"
                    }
                ]
            },
        ]

        @Provide() services=[]

        @Provide() route_path=""

        @Provide() selected_index=""

        @Provide() $refs:any

        activeClass(path,menuindex){
            if(this.$route.path==path){
                this.selected_index=menuindex
                return ['is-active']
            }else{
                return []
            }
        }

        // @Watch('selected_index')
        // setSelectedIndex(val){
        //     console.log("index:",val)
        //     this.$refs.sidebar.open(val)
        // }

        mounted(){
            this.route_path=this.$route.path
            console.log(this.route_path)
            getAllServices().then(data=>{
                this.services=data.data
                this.menus.forEach((item,index)=>{
                    if(item.title=="服务列表"){
                        let submenus=data.data.map(item=>{
                            return {
                                'title':item.name,
                                "path":"/service/"+item.alias
                            }
                        })
                        this.$set(this.menus[index],"submenus",submenus)
                    }else if(item.title=="订单"){
                        let submenus=data.data.map(item=>{
                            return {
                                "title":item.name,
                                "path":"/order/"+item.alias,
                            }
                        })
                        this.$set(this.menus[index],"submenus",submenus)
                    }
                })
            })
        }
    }
</script>