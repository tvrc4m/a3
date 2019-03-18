import req from '@/utils/request'

// 获取所有的角色
export function getAllCompanies(){
    return req.get(process.env.API_URL+"/admin/companies")
}
// 角色分页
export function getCompanies(page=1,limit=20){
    return req.get(process.env.API_URL+"/admin/company",{
        params:{
            page,limit
        }
    })   
}

export function getCompany(company_id){
    return req.get(`${process.env.API_URL}/admin/company/${company_id}`)
}

export function addCompany(company){
    return req.post(`${process.env.API_URL}/admin/company`,company)
}

export function editCompany(company){
    return req.put(`${process.env.API_URL}/admin/company/${company.id}`,{
        id:company.id,
        name:company.name,
        remark:company.remark
    })
}

export function delCompany(company_id){
    return req.delete(`${process.env.API_URL}/admin/company/${company_id}`)
}

export function getTypes(){
    return req.get(`${process.env.API_URL}/admin/company/type`)
}


export function getType(type_id){
    return req.get(`${process.env.API_URL}/admin/company/type/${type_id}`)
}

export function addType(type){
    return req.post(`${process.env.API_URL}/admin/company/type`,type)
}

export function editType(type){
    return req.put(`${process.env.API_URL}/admin/company/type/${type.id}`,{
        id:type.id,
        name:type.name,
    })
}

export function delType(type_id){
    return req.delete(`${process.env.API_URL}/admin/company/type/${type_id}`)
}