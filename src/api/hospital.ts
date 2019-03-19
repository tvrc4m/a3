import req from '@/utils/request'

export function getOffices(company_id:number,page=1,limit=20){
    return req.get(`${process.env.API_URL}/admin/company/office`,{params:{company_id,page,limit}})
}

export function getOffice(office_id:number){
    return req.get(`${process.env.API_URL}/admin/company/office/${office_id}`)
}

export function addOffice(params:{name:string,sort:number,company_id:number}){
    return req.post(`${process.env.API_URL}/admin/company/office`,params)
}

export function editOffice(params:{id:number,name:string,sort:number,company_id:number}){
    return req.put(`${process.env.API_URL}/admin/company/office/{$params.id}`,params)   
}

export function delOffice(office_id:number){
    return req.delete(`${process.env.API_URL}/admin/company/office/${office_id}`)   
}