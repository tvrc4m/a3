import req from '@/utils/request'

export function getPackages(company_id:number,page=1,limit=20){
    return req.get(`${process.env.API_URL}/admin/service/tijian/package`,{params:{company_id,page,limit}})
}

export function getPackage(package_id:number){
    return req.get(`${process.env.API_URL}/admin/service/tijian/package/${package_id}`)
}

export function addPackage(params:{name:string,tel:string,company_id:number,office_id:number}){
    return req.post(`${process.env.API_URL}/admin/service/tijian/package`,params)
}

export function editPackage(params:{id:number,name:string,tel:string,company_id:number,office_id:number}){
    return req.put(`${process.env.API_URL}/admin/service/tijian/package/${params.id}`,params)   
}

export function delPackage(package_id:number){
    return req.delete(`${process.env.API_URL}/admin/service/tijian/package/${package_id}`)   
}