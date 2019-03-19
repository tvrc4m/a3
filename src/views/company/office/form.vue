<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}科室</span>
            </div>
            <el-form ref="office" :model="office" label-width="130px" :inline="true">
                <el-form-item label="科室名称" prop="name" style="display: block;">
                    <el-input type="text" v-model="office.name" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="sort" style="display: block;">
                    <div slot="label">
                        <span>排序</span>
                        <el-tooltip content="从大到小进行排序" placement="top">
                            <el-icon class="el-icon-info" style="display: inline-block;"></el-icon>
                        </el-tooltip>
                    </div>
                    <el-input type="text" v-model="office.sort" clearable autocomplete="off"></el-input>
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
    import { getOffice,addOffice,editOffice } from '@/api/hospital'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminUserForm extends Vue{

        @Provide() office={
            id:0,
            name:"",
            sort:null,
            company_id:0
        }
        @Provide() is_add:Boolean=false

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addOffice(this.office).then(data=>{
                    this.$router.push({name:"companyOfficeList",query:{company_id:this.office.company_id.toString()}})
                })
            }else{
                console.log(this.office)
                editOffice(this.office).then(data=>{
                    this.$router.push({name:"companyOfficeList",query:{company_id:this.office.company_id.toString()}})
                })
            }
        }

        mounted(){
            if(this.$route.params.id){
                this.is_add=false
                getOffice(parseInt(this.$route.params.id)).then(data=>{
                    this.office=data.data
                })
            }else if(this.$route.query.company_id){
                this.is_add=true
                this.office.company_id=parseInt(this.$route.query.company_id)
            }else{
                this.$message.error("参数错误")
            }
            
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"companyOfficeList",
                        query:{company_id:this.office.company_id.toString()}
                    },
                    name:"科室列表"
                }
            ])
        }
    }
</script>