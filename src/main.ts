import Vue from 'vue'
import ElementUI from 'element-ui'
import 'moment/locale/zh-cn'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
require("./filters")

import '@/router/authority'
import '@/sass/element-theme.scss';
import '@/sass/anticon.scss'
import '@/sass/main.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.config.errorHandler=function(err,vm,info){
    console.log(err,vm,info)
}

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
