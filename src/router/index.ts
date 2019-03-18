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
// 后台角色
const AdminRuleList=()=>import('@/views/rule/index')
const AdminRuleForm=()=>import('@/views/rule/form')
// 企业
const CompanyList=()=>import('@/views/company/index')
const CompanyForm=()=>import('@/views/company/form')

const companyTypeList=()=>import('@/views/company/type/index')
const companyTypeForm=()=>import('@/views/company/type/form')

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
    },
    {
        path: '/admin/rule',
        component: LayoutBasic,
        children: [
            {
                path:"",
                name:"adminRule",
                component:AdminRuleList
            },
            {
                path:"add",
                name:"adminRuleAdd",
                component:AdminRuleForm
            },
            {
                path:"edit/:id",
                name:"adminRuleEdit",
                component:AdminRuleForm
            }
        ]
    },
    {
        path: '/company',
        component: LayoutBasic,
        children: [
            {
                path:"",
                name:"companyList",
                component:CompanyList
            },
            {
                path:"add",
                name:"companyAdd",
                component:CompanyForm
            },
            {
                path:"edit/:id",
                name:"companyEdit",
                component:CompanyForm
            },
            {
                path:"type",
                name:"companyTypeList",
                component:companyTypeList
            },
            {
                path:"type/add",
                name:"companyTypeAdd",
                component:companyTypeForm
            },
            {
                path:"type/edit/:id",
                name:"companyTypeEdit",
                component:companyTypeForm
            },
        ]
    }
]

const router = new Router({
  routes
})

export default router
