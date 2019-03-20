
import { Component,Provide,Vue } from 'vue-property-decorator'

declare module 'vue/types/vue'{
    interface Vue{
        is_add:Boolean;
        btnname:String;
        back();
    }
}

@Component({})
export default class FormMixin extends Vue{

    @Provide() is_add:boolean

    get btnname():string{
        return this.is_add?"添加":"编辑"
    }

    back(){
        this.$router.back()
    }

    mounted(){
        if(this.$route.params.id){
            console.log(this.$route)
            this.is_add=false
        }else{
            this.is_add=true
        }

    }
}


