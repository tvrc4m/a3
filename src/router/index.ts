import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LayoutBasic=()=>import('@/views/layout/basic')
const LayoutUser=()=>import('@/views/layout/user')

const home=()=>import('@/views/home/index')
const login=()=>import('@/views/user/login')
// 用户
const UserList=()=>import('@/views/user/index')
const UserForm=()=>import('@/views/user/form')

// 后台用户
const AdminList=()=>import('@/views/admin/index')
const AdminForm=()=>import('@/views/admin/form')

const routes = [
    {
        path: '/',
        component: LayoutBasic,
        children: [
            {
                path:"",
                component:home
            },
            {
                path:"users",
                component:UserList,
                meta:{
                    group:"user"
                }
            }, 
            {
                path:"user/add",
                component:UserForm,
                name:"userAdd",
                meta:{
                    group:"user"
                }
            },
            {
                path:"user/edit/:uid",
                component:UserForm,
                name:"userEdit",
                meta:{
                    group:"user"
                }
            }
        ]
    },
    {
        path: '/user',
        component: LayoutUser,
        children: [
            {
                path:"login",
                component:login
            },
        ]
    },
    {
        path: '/admin',
        component: LayoutBasic,
        children: [
            {
                path:"",
                name:"adminList",
                component:AdminList
            },
            {
                path:"add",
                name:"adminAdd",
                component:AdminForm
            },
            {
                path:"edit/:id",
                name:"adminEdit",
                component:AdminForm
            },
        ]
    }
]

const router = new Router({
  routes
})

export default router
