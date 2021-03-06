
import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import {Message,MessageBox} from 'element-ui'
import router from '@/router/index'

const service = axios.create({
    baseURL: process.env.BASE_URL,
    // withCredentials: true
})

service.interceptors.request.use(request=>{
    if(request.method=="post"){
        request.data.token=localStorage.getItem("token") || ""
        request.data=qs.stringify(request.data)
    }
    return request
},error=>{
    Promise.reject(error)
})

service.interceptors.response.use(
    (response) => {
        if(response.status==200){
            if(response.data.errno!=0){
                if(response.data.errno==1001){
                    router.push("/user/login")
                }else if(response.data.errno==1002){
                    MessageBox.confirm("登录已失效,需要重新登录","登录提示",{}).then(()=>{
                        router.push("/user/login")
                    })
                    return Promise.reject("登录失效")
                }else{
                    Message({
                        message:response.data.errmsg,
                        type:"error"
                    })
                    return Promise.reject(response.data.errmsg)
                }
            }else{
                return response.data
            }
        }else{
            Message({
                message:"请求异常",
                type:"error"
            })
        }
    },
    (error: any) => {
        console.log(error)
        console.log('fetch',error.config.url,error.config.params,'error. error:',error)
        return Promise.reject(error)
    }
)

export default service

