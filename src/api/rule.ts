import req from '@/utils/request'

export function getRulePages(){
    return req.get(process.env.API_URL+"/admin/rule/pages")
}
// 获取所有的角色
export function getAllRules(){
    return req.get(process.env.API_URL+"/admin/rules")
}
// 角色分页
export function getRules(page=1,limit=20){
    return req.get(process.env.API_URL+"/admin/rule",{
        params:{
            page,limit
        }
    })   
}

export function getRule(rule_id){
    return req.get(`${process.env.API_URL}/admin/rule/${rule_id}`)
}

export function addRule(rule){
    return req.post(`${process.env.API_URL}/admin/rule`,rule)
}

export function editRule(rule){
    return req.put(`${process.env.API_URL}/admin/rule/${rule.id}`,{
        id:rule.id,
        name:rule.name,
        remark:rule.remark
    })
}

export function delRule(rule_id){
    return req.delete(`${process.env.API_URL}/admin/rule/${rule_id}`)
}