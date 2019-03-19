import req from '@/utils/request'

export function getAllServices(){
    return req.get(process.env.API_URL+"/admin/services")
}

export function getServices(page=1,limit=20){
    return req.get(process.env.API_URL+"/admin/service",{
        params:{
            page,limit
        }
    })   
}

export function getService(service_id){
    return req.get(`${process.env.API_URL}/admin/service/${service_id}`)
}

export function getServiceCompany(service_alias,page=1,limit=20){
    return req.get(`${process.env.API_URL}/admin/service/${service_alias}`,{
        params:{
            page,limit
        }
    })
}

export function addService(service){
    return req.post(`${process.env.API_URL}/admin/service`,service)
}

export function editService(service){
    return req.put(`${process.env.API_URL}/admin/service/${service.id}`,{
        id:service.id,
        name:service.name,
        remark:service.remark
    })
}

export function delService(service_id){
    return req.delete(`${process.env.API_URL}/admin/service/${service_id}`)
}
