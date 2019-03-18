<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}后台用户</span>
            </div>
            <el-form ref="user" :model="user" label-width="100px" :inline="true">
                <el-form-item label="角色" prop="rule_id" style="display: block;">
                    <el-select v-model="user.rule_id" placeholder="请选择角色">
                        <el-option v-for="rule in rules" :key="rule.id" :label="rule.name" :value="rule.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="username" style="display: block;">
                    <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname" style="display: block;">
                    <el-input type="text" v-model="user.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" style="display: block;">
                    <el-input type="text" v-model="user.password" autocomplete="off"></el-input>
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
    import { getAdminUser,editAdminUser,addAdminUser } from '@/api/admin'
    import { getAllRules } from '@/api/rule'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminUserForm extends Vue{

        @Provide() user={
            id:0,
            username:"",
            nickname:"",
            password:"",
            rule_id:null
        }
        @Provide() rule_id:Number=0
        @Provide() rules:Array<{id:Number,name:String}>=[]
        @Provide() is_add:Boolean=false

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addAdminUser(this.user).then(data=>{
                    this.$router.push({name:"adminList"})
                })
            }else{
                editAdminUser(this.user.id,this.user).then(data=>{
                    console.log('edituser',data)
                    this.$router.push({name:"adminList"})
                })
            }
        }

        mounted(){
            if(this.$route.params.id){
                this.is_add=false
                getAllRules().then(data=>{
                    this.rules=data.data
                })
                getAdminUser(parseInt(this.$route.params.id)).then(data=>{
                    this.user=data.data
                })
            }else{
                this.is_add=true
                getAllRules().then(data=>{
                    this.rules=data.data
                })
            }
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"adminList"
                    },
                    name:"后台账户列表"
                }
            ])
        }
    }
</script>