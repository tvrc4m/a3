<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}家庭医生</span>
            </div>
            <el-form ref="doctor" :model="doctor" label-width="130px" :inline="true">
                <el-form-item label="医生姓名" style="display: block;">
                    <el-input type="text" v-model="doctor.name" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="tel" style="display: block;">
                    <el-input type="text" v-model="doctor.tel" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属科室" style="display: block;">
                    <el-select v-model="doctor.office_id" clearable placeholder="请选择所属科室">
                        <el-option
                          v-for="office in offices"
                          :key="office.id"
                          :label="office.name"
                          :value="office.id">
                        </el-option>
                    </el-select>
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
    import { getDoctor,addDoctor,editDoctor } from '@/api/service/doctor'
    import { getOffices } from '@/api/hospital'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminUserForm extends Vue{

        @Provide() doctor={
            id:0,
            name:"",
            office_id:null,
            company_id:0,
            tel:"",
        }
        @Provide() is_add:Boolean=false
        @Provide() offices=[]
        @Provide() company={id:null}
        @Provide() alias="jiating"

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addDoctor(this.doctor).then(data=>{
                    this.$router.push({name:"ServiceSetting",params:{alias:this.alias,id:this.company.id.toString()}})
                })
            }else{
                editDoctor(this.doctor).then(data=>{
                    console.log('editdoctor',data)
                    this.$router.push({name:"ServiceSetting",params:{alias:this.alias,id:this.doctor.company_id.toString()}})
                })
            }
        }

        mounted(){
            this.company.id=parseInt(this.$route.query.company_id)
            if(this.$route.params.id){
                this.is_add=false
                getDoctor(parseInt(this.$route.params.id)).then(data=>{
                    this.doctor=data.data
                })
            }else{
                this.is_add=true
                this.doctor.company_id=this.company.id
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
                    name:"家庭医生列表"
                }
            ])
        }
    }
</script>