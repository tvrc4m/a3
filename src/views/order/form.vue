<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}企业</span>
            </div>
            <el-form ref="company" :model="company" label-width="130px" :inline="true">
                <el-form-item label="企业类型" prop="type" style="display: block;">
                    <el-select v-model="company.type" placeholder="请选择类型">
                        <el-option v-for="type in types" :key="type.id" :label="type.name" :value="type.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业名称" prop="name" style="display: block;">
                    <el-input type="text" v-model="company.name" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="logo">
                    <el-upload
                      class="avatar-uploader"
                      :action="posturl"
                      :data="{folder:'company'}"
                      :on-success="handleFileSuccess"
                      :show-file-list="false">
                      <img v-if="company.logo" :src="company.logo" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="企业地址" prop="address" style="display: block;">
                    <el-input type="text" v-model="company.address" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact" style="display: block;">
                    <el-input type="text" v-model="company.contact" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="tel" style="display: block;">
                    <el-input type="text" v-model="company.tel" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="介绍" prop="content" style="display: block;">
                    <el-input type="textarea" autosize v-model="company.content" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序(从大到小)" prop="sort" style="display: block;">
                    <el-input type="text" v-model="company.sort" clearable autocomplete="off"></el-input>
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
    import { getCompany,addCompany,editCompany,getTypes } from '@/api/company'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminUserForm extends Vue{

        @Provide() company={
            id:0,
            name:"",
            logo:"",
            contact:"",
            tel:"",
            content:"",

        }
        @Provide() types=[]
        @Provide() is_add:Boolean=false

        get posturl(){
            return process.env.API_URL+"/admin/upload/image"
        }

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addCompany(this.company).then(data=>{
                    this.$router.push({name:"companyList"})
                })
            }else{
                editCompany(this.company).then(data=>{
                    console.log('editcompany',data)
                    this.$router.push({name:"companyList"})
                })
            }
        }

        handleFileSuccess(res, file){
            this.company.logo=res.data.url
        }

        mounted(){
            if(this.$route.params.id){
                this.is_add=false
                getCompany(parseInt(this.$route.params.id)).then(data=>{
                    this.company=data.data
                })
            }else{
                this.is_add=true
            }
            getTypes().then(data=>{
                this.types=data.data.data
            })
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"companyList"
                    },
                    name:"企业列表"
                }
            ])
        }
    }
</script>