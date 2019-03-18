<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}企业类型</span>
            </div>
            <el-form ref="type" :model="type" label-width="100px" :inline="true">
                <el-form-item label="类型名称" prop="name" style="display: block;">
                    <el-input type="text" v-model="type.name" clearable autocomplete="off"></el-input>
                </el-form-item>
                <div style="margin-left: 150px;">
                    <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
                </div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { getType,addType,editType } from '@/api/company'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminUserForm extends Vue{

        @Provide() type={
            id:0,
            name:"",
            logo:"",
            contact:"",
            tel:"",
            content:"",

        }
        @Provide() types=[]
        @Provide() is_add:Boolean=false

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addType(this.type).then(data=>{
                    this.$router.push({name:"companyTypeList"})
                })
            }else{
                editType(this.type).then(data=>{
                    console.log('edittype',data)
                    this.$router.push({name:"companyTypeList"})
                })
            }
        }

        mounted(){
            if(this.$route.params.id){
                this.is_add=false
                getType(parseInt(this.$route.params.id)).then(data=>{
                    this.type=data.data
                })
            }else{
                this.is_add=true
            }
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"companyTypeList"
                    },
                    name:"企业类型列表"
                }
            ])
        }
    }
</script>