import req from '@/utils/request'

export function getDoctors(company_id:number,page=1,limit=20){
    return req.get(`${process.env.API_URL}/admin/service/jiating/doctor`,{params:{company_id,page,limit}})
}

export function getDoctor(doctor_id:number){
    return req.get(`${process.env.API_URL}/admin/service/jiating/doctor/${doctor_id}`)
}

export function addDoctor(params:{name:string,tel:string,company_id:number,office_id:number}){
    return req.post(`${process.env.API_URL}/admin/service/jiating/doctor`,params)
}

export function editDoctor(params:{id:number,name:string,tel:string,company_id:number,office_id:number}){
    return req.put(`${process.env.API_URL}/admin/service/jiating/doctor/${params.id}`,params)   
}

export function delDoctor(doctor_id:number){
    return req.delete(`${process.env.API_URL}/admin/service/jiating/doctor/${doctor_id}`)   
}