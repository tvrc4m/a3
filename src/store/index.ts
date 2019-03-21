import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import policy from './policy'
import service from './service'

export default new Vuex.Store({
    modules:{
        policy,
        service,
    },
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
