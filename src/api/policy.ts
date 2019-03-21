import req from '@/utils/request'

// 获取用户列表
export function listModule(params={}){
    return req.get(process.env.API_URL+"/admin/policy/module",{
        params
    })
}

// 获取用户详情
export function getModule(id:number){
    return req.get(`${process.env.API_URL}/admin/policy/module/${id}`)
}

// 添加新用户
export function addModule(params={}){
    return req.post(process.env.API_URL+"/admin/policy/module",params)
}

// 编辑用户信息
export function editModule(params:{id:number}){
    return req.put(`${process.env.API_URL}/admin/policy/module/${params.id}`,params)
}

export function updateModuleStatus(id:number,status:number){
    return req.put(`${process.env.API_URL}/admin/policy/module/${id}/status`,{status})
}

// 删除用户
export function delModule(id:number){

    return req.delete(`${process.env.API_URL}/admin/policy/module/${id}`)
}


// 获取用户列表
export function listNews(params={}){
    console.log(params)
    return req.get(process.env.API_URL+"/admin/policy/news",{
        params
    })
}

// 获取用户详情
export function getNews(id:number){
    return req.get(`${process.env.API_URL}/admin/policy/news/${id}`)
}

// 添加新用户
export function addNews(params={}){
    return req.post(process.env.API_URL+"/admin/policy/news",params)
}

// 编辑用户信息
export function editNews(params:{id:number}){
    return req.put(`${process.env.API_URL}/admin/policy/news/${params.id}`,params)
}

export function updateNewsStatus(id:number,status:number){
    return req.put(`${process.env.API_URL}/admin/policy/news/${id}/status`,{status})
}

export function updateNewsBannerStatus(id:number,show_banner:number){
    return req.put(`${process.env.API_URL}/admin/policy/news/${id}/banner`,{show_banner})
}

// 删除用户
export function delNews(id:number){

    return req.delete(`${process.env.API_URL}/admin/policy/news/${id}`)
}

