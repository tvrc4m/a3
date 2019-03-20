import req from '@/utils/request'

// 获取用户列表
export function getNewsList(params={}){
    console.log(params)
    return req.get(process.env.API_URL+"/admin/news",{
        params
    })
}

// 获取用户详情
export function getNews(id:number){
    return req.get(`${process.env.API_URL}/admin/news/${id}`)
}

// 添加新用户
export function addNews(params={}){
    return req.post(process.env.API_URL+"/admin/news",params)
}

// 编辑用户信息
export function editNews(params:{id:number}){
    return req.put(`${process.env.API_URL}/admin/news/${params.id}`,params)
}

export function updateNewsStatus(id:number,status:number){
    return req.put(`${process.env.API_URL}/admin/news/${id}/status`,{status})
}

export function updateNewsBannerStatus(id:number,show_banner:number){
    return req.put(`${process.env.API_URL}/admin/news/${id}/banner`,{show_banner})
}

// 删除用户
export function delNews(id:number){

    return req.delete(`${process.env.API_URL}/admin/news/${id}`)
}

