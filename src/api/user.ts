import req from '@/utils/request'

// 获取用户列表
export function getUsers(params={}){
    console.log(params)
    return req.get(process.env.API_URL+"/admin/user")
}

// 获取用户详情
export function getUser(uid:Number){
    return req.get(`${process.env.API_URL}/admin/user/${uid}`)
}

// 添加新用户
export function addUser(params={}){
    return req.post(process.env.API_URL+"/admin/user",params)
}

// 编辑用户信息
export function editUser(params:{id:number}){
    return req.put(`${process.env.API_URL}/admin/user/${params.id}`,params)
}

export function editUserStatus(id:number,status:number){
    return req.put(`${process.env.API_URL}/admin/user/${id}/status`,{status})   
}

// 删除用户
export function delUser(id:number){

    return req.delete(`${process.env.API_URL}/admin/user/${id}`)
}

