import req from '@/utils/request'

export function getRulePages(){
    return req.get(process.env.API_URL+"/admin/rule/pages")
}

export function getRules(){
    return req.get(process.env.API_URL+"/admin/rules")   
}