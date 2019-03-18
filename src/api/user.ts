import req from '@/utils/request'

export type TypeUser={
    id:Number,
    phone:String,
    date_add:Number,
    create_time?:String
}

// 获取用户列表
export function getUsers(params={}){
    console.log(params)
    return req.get(process.env.API_URL+"/admin/user")
}

// 获取用户详情
export function getUser(uid:Number){
    return req.get(process.env.API_URL+"/admin/user/",{params:{uid}})
}

// 添加新用户
export function addUser(params={}){
    return req.post(process.env.API_URL+"/admin/user/index/add",params)
}

// 编辑用户信息
export function editUser(params={}){
    return req.post(process.env.API_URL+"/admin/user/index/edit",params)
}

// 删除用户
export function delUser(uid:Number){

    return req.post(process.env.API_URL+"/admin/user/index/del",{uid})
}

