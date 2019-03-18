import req from '@/utils/request'

export function login(username:String,password:String){
    return req.post(process.env.API_URL+"/admin/login",{
        username,password
    })
}

export function getAdminUsers(page=1,limit=20){
    return req.get(process.env.API_URL+"/admin/admin",{
        params:{
            page,limit
        }
    })
}

export function getAdminUser(admin_id:Number){
    return req.get(`${process.env.API_URL}/admin/admin/${admin_id}`)
}

export function addAdminUser(data){
    return req.post(`${process.env.API_URL}/admin/admin`,data)
}

export function editAdminUser(admin_id:Number,data){
    return req.put(`${process.env.API_URL}/admin/admin/${admin_id}`,data)
}

export function delAdminUser(admin_id:Number){
    return req.delete(`${process.env.API_URL}/admin/admin/del/${admin_id}`)
}