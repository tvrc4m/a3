<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">后台账户列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goUserAdd">新增后台账户</el-button>
                </div>
            </div>
            <el-table :data="users" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" @click="del(scope.row.id)">删除</el-button>
                        <el-button type="primary" plain size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="bottom clearfix">
                <div class="pagination">
                    <el-pagination background @current-change="changePage" :page-size="pageSize" layout="pager,total" :total="total"></el-pagination>
                </div>
            </div>
        </el-card>
    </el-container>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'

    import { getAdminUsers,delAdminUser } from '@/api/admin'

    @Component({})
    export default class UserIndex extends Vue{

       @Provide() users=[]
       @Provide() params={}
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() columns=[
            {
                label:"ID",
                name:"id",
                width:"60px",
                sort:true
            },
            {
                label:"用户名",
                name:"username",
            },
            {
                label:"昵称",
                name:"nickname",
            },
            {
                label:"角色",
                name:"rule",
            },
            {
                label:"创建时间",
                name:"createtime",
            },
            {
                label:"最后登录时间",
                name:"logintime",
            },
            {
                label:"最后登录IP",
                name:"loginip",
            },
            {
                label:"登录次数",
                name:"logins",
            },
       ];

       goUserAdd(){
            this.$router.push("/admin/add")
       }

       edit(id:any){
            this.$router.push({name:"adminEdit",params:{id:id}})
       }

       del(id:any){
            this.$confirm("是否确定要删除该用户","提示",{
                showCancelButton:true
            }).then(()=>{
                delAdminUser(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.users=this.users.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       listUsers(page=1){
            getAdminUsers(page).then(data=>{
                this.users=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listUsers(page)
       }

       mounted(){
            this.listUsers(1)
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
