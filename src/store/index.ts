import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        breadcrumbs:[],
        showBreadcrumb: true
    },
    mutations:{
        setBreadcrumb(state,breadcrumbs){
            console.log(breadcrumbs)
            state.breadcrumbs=breadcrumbs
            state.showBreadcrumb=true
        },
        hideBreadcrumb(state){
            state.showBreadcrumb=false
        }
    }
})
