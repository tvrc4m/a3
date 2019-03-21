export default {
    namespaced:true,
    state:{
        serviceTypes: JSON.parse(localStorage.getItem("servicesTypes")) || []
    },
    getters:{
        updateServiceTypes(state,types){
            state.serviceTypes=types
            localStorage.setItem("servicesTypes",JSON.stringify(types))
        }
    },
    actions:{
        async getServiceTypes(){

        }
    }
}