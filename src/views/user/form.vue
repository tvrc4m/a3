<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}用户</span>
            </div>
            <el-form ref="user" :model="user" label-width="100px" :inline="true">
                <el-form-item label="头像">
                    <el-upload
                      class="avatar-uploader"
                      :action="posturl"
                      :data="{folder:'user'}"
                      :on-success="handleFileSuccess"
                      :show-file-list="false">
                      <img v-if="user.avatar" :src="user.avatar" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="手机号" style="display: block;">
                    <el-input type="text" clearable v-model="user.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" style="display: block;">
                    <el-input type="text" clearable v-model="user.realname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" style="display: block;">
                    <el-radio v-model="user.sex" :label="1">男</el-radio>
                    <el-radio v-model="user.sex" :label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="单位" style="display: block;">
                    <el-input type="text" clearable v-model="user.company" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="职务" style="display: block;">
                    <el-input type="text" clearable v-model="user.job" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" style="display: block;">
                    <el-switch v-model="user.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
                <div style="margin-left: 150px;">
                    <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
                </div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { addUser,getUser,editUser } from '@/api/user'

    @Component({})
    export default class UserForm extends Vue{

        @Provide() user={
            id:null,
            phone:null,
            realname:"",
            company:"",
            job:"",
            status:1,
            sex:null,
            avatar:"",
        }
        @Provide() is_add:boolean=false

        get btnname():string{
            return this.is_add?"添加":"编辑"
        }

        get posturl(){
            return process.env.API_URL+"/admin/upload/image"
        }

        handleFileSuccess(res, file){
            this.user.avatar=res.data.url
        }

        add(){
            if(this.is_add){
                addUser(this.user).then(data=>{
                    this.$router.push({name:"userList"})
                })
            }else{
                editUser(this.user).then(data=>{
                    this.$router.push({name:"userList"})
                })
            }
        }

        mounted(){
            if(this.$route.params.id){
                getUser(parseInt(this.$route.params.id)).then(data=>{
                    this.user=data.data
                })
                this.is_add=false
            }else{
                this.is_add=true
            }
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"userList"
                    },
                    name:"用户列表"
                }
            ])
        }
    }
</script>