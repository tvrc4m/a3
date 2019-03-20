<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}体检套餐</span>
            </div>
            <el-form ref="package" :model="package" label-width="130px" :inline="true">
                <el-form-item label="套餐名称" style="display: block;">
                    <el-input type="text" v-model="package.name" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" style="display: block;">
                    <el-input type="textarea" autosize v-model="package.content" clearable autocomplete="off"></el-input>
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
    import { getPackage,addPackage,editPackage } from '@/api/service/package'
    import { getOffices } from '@/api/hospital'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminUserForm extends Vue{

        @Provide() package={
            id:0,
            name:"",
            office_id:null,
            company_id:0,
            tel:"",
        }
        @Provide() is_add:Boolean=false
        @Provide() offices=[]
        @Provide() company={id:null}
        @Provide() alias="tijian"

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addPackage(this.package).then(data=>{
                    this.$router.push({name:"ServiceSetting",params:{alias:this.alias,id:this.company.id.toString()}})
                })
            }else{
                editPackage(this.package).then(data=>{
                    console.log('editpackage',data)
                    this.$router.push({name:"ServiceSetting",params:{alias:this.alias,id:this.package.company_id.toString()}})
                })
            }
        }

        mounted(){
            this.company.id=parseInt(this.$route.query.company_id)
            if(this.$route.params.id){
                this.is_add=false
                getPackage(parseInt(this.$route.params.id)).then(data=>{
                    this.package=data.data
                })
            }else{
                this.is_add=true
                this.package.company_id=this.company.id
            }
            if(!this.company.id){
                this.$message.error("未指定公司");
                this.$router.back()
            }
            getOffices(this.company.id).then(data=>{
                this.offices=data.data.data
            })
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"ServiceSetting",
                        params:{
                            alias:this.alias,
                            id:this.company.id
                        }
                    },
                    name:"体检套餐列表"
                }
            ])
        }
    }
</script>