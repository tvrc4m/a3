import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LayoutBasic=()=>import('@/views/layout/basic')
const LayoutUser=()=>import('@/views/layout/user')

const home=()=>import('@/views/home/index')
const login=()=>import('@/views/admin/login')
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
const CompanyOfficeList=()=>import('@/views/company/office/index')
const CompanyOfficeForm=()=>import('@/views/company/office/form')
// 服务
const ServiceList=()=>import('@/views/service/index')
const ServiceSetting=()=>import('@/views/service/setting')

// 家庭医生
const JiatingDoctorForm=()=>import('@/views/service/jiating/form')
// 体检套餐
const TijianPakcageForm=()=>import('@/views/service/tijian/package/form')

const companyTypeList=()=>import('@/views/company/type/index')
const companyTypeForm=()=>import('@/views/company/type/form')
// 订单
const orderList=()=>import('@/views/order/index')
const orderForm=()=>import('@/views/order/form')

// 新闻
const newsList=()=>import('@/views/news/index')
const newsForm=()=>import('@/views/news/form')

const routes = [
    {
        path: '/',
        component: LayoutBasic,
        children: [
            {
                path:"",
                component:home,
                meta:{
                    group:"home"
                }
            }
        ]
    },
    {
        path: '/login',
        component: LayoutUser,
        children: [
            {
                path:"",
                component:login,
            }
        ]
    },
    {
        path: '/user',
        component: LayoutBasic,
        children: [
            {
                path:"",
                component:UserList,
                name:"userList",
                meta:{
                    group:"user"
                }
            }, 
            {
                path:"add",
                component:UserForm,
                name:"userAdd",
                meta:{
                    group:"user"
                }
            },
            {
                path:"edit/:id",
                component:UserForm,
                name:"userEdit",
                meta:{
                    group:"user"
                }
            }
        ]
    },
    {
        path: '/admin',
        component: LayoutBasic,
        children: [
            {
                path:"",
                name:"adminList",
                component:AdminList,
                meta:{
                    group:"admin"
                }
            },
            {
                path:"add",
                name:"adminAdd",
                component:AdminForm,
                meta:{
                    group:"admin"
                }
            },
            {
                path:"edit/:id",
                name:"adminEdit",
                component:AdminForm,
                meta:{
                    group:"admin"
                }
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
                component:AdminRuleList,
                meta:{
                    group:"admin"
                }
            },
            {
                path:"add",
                name:"adminRuleAdd",
                component:AdminRuleForm,
                meta:{
                    group:"admin"
                }
            },
            {
                path:"edit/:id",
                name:"adminRuleEdit",
                component:AdminRuleForm,
                meta:{
                    group:"admin"
                }
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
                component:CompanyList,
                meta:{
                    group:"company"
                }
            },
            {
                path:"add",
                name:"companyAdd",
                component:CompanyForm,
                meta:{
                    group:"company"
                }
            },
            {
                path:"edit/:id",
                name:"companyEdit",
                component:CompanyForm,
                meta:{
                    group:"company"
                }
            },
            {
                path:"type",
                name:"companyTypeList",
                component:companyTypeList,
                meta:{
                    group:"company"
                }
            },
            {
                path:"type/add",
                name:"companyTypeAdd",
                component:companyTypeForm,
                meta:{
                    group:"company"
                }
            },
            {
                path:"type/edit/:id",
                name:"companyTypeEdit",
                component:companyTypeForm,
                meta:{
                    group:"company"
                }
            },
            {
                path:"office",
                name:"companyOfficeList",
                component:CompanyOfficeList,
                meta:{
                    group:"company"
                }
            },
            {
                path:"office/add",
                name:"companyOfficeAdd",
                component:CompanyOfficeForm,
                meta:{
                    group:"company"
                }
            },
            {
                path:"office/edit/:id",
                name:"companyOfficeEdit",
                component:CompanyOfficeForm,
                meta:{
                    group:"company"
                }
            }
        ]
    },
    {
        path: '/service',
        component: LayoutBasic,
        children: [
            {
                path:":alias",
                name:"serviceList",
                component:ServiceList,
                meta:{
                    group:"service"
                }
            },
            {
                path:":alias/setting/:id",
                name:"ServiceSetting",
                component:ServiceSetting,
                meta:{
                    group:"service"
                }
            },
            {
                path:"jiating/doctor/add",
                name:"JiatingDoctorAdd",
                component:JiatingDoctorForm,
                meta:{
                    group:"service"
                }
            },
            {
                path:"jiating/doctor/add/:id",
                name:"JiatingDoctorEdit",
                component:JiatingDoctorForm,
                meta:{
                    group:"service"
                }
            },
            {
                path:"tijian/package/add",
                name:"TijianPakcageAdd",
                component:TijianPakcageForm,
                meta:{
                    group:"service"
                }
            },
            {
                path:"tijian/package/add/:id",
                name:"TijianPakcageEdit",
                component:TijianPakcageForm,
                meta:{
                    group:"service"
                }
            }
        ]
    },
    {
        path: '/order',
        component: LayoutBasic,
        children: [
            {
                path:":name",
                name:"orderList",
                component:orderList,
                meta:{
                    group:"order"
                }
            },
            {
                path:"edit/:name",
                name:"orderEdit",
                component:orderForm,
                meta:{
                    group:"order"
                }
            }
        ]
    },
    {
        path: '/news',
        component: LayoutBasic,
        children: [
            {
                path:"",
                name:"newsList",
                component:newsList,
                meta:{
                    group:"news"
                }
            },
            {
                path:"add",
                name:"newsAdd",
                component:newsForm,
                meta:{
                    group:"news"
                }
            },
            {
                path:"edit/:id",
                name:"newsEdit",
                component:newsForm,
                meta:{
                    group:"news"
                }
            }
        ]
    }
]

const router = new Router({
  routes
})

export default router
