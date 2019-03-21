import { listModule } from '@/api/policy'
export default {
    namespaced:true,
    state:{
        modules:JSON.parse(localStorage.getItem("policy_modules")) || []
    },
    mutations:{
        updatePolicyModules(state,modules){
            state.modules=modules
            localStorage.setItem("policy_modules",JSON.stringify(modules))
        }
    },
    actions:{
        async listPolicyModules({commit}){
            return listModule().then(data=>{
                commit("updatePolicyModules",data.data.data)
            })
        }
    }
}