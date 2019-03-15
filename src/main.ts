import Vue from 'vue'
import ElementUI from 'element-ui'
import 'moment/locale/zh-cn'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/router/authority'

import '@/theme/element-theme.scss';

Vue.config.productionTip = false
Vue.config.errorHandler=function(err,vm,info){
    console.log(err,vm,info)
}
console.log(ElementUI)
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
