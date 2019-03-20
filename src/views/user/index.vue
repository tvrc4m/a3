<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">用户列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goUserAdd">新增用户</el-button>
                </div>
            </div>
            <el-table :data="users" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort">
                    <template slot-scope="scope">
                        <span v-if="column.name=='createtime'">
                            {{scope.row['createtime'] | formatDate}}
                        </span>
                        <span v-else-if="column.name=='sex'">
                            {{scope.row['sex']==1?'男':'女'}}
                        </span>
                        <span v-else-if="column.name=='status'">
                            <el-switch v-model="scope.row['status']" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="changeStatus(scope.row)"></el-switch>
                        </span>
                        <span v-else>{{scope.row[column.name]}}</span>
                    </template>
                </el-table-column>
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

    import { getUsers,delUser,editUserStatus } from '@/api/user'

    @Component({})
    export default class UserIndex extends Vue{

       @Provide() users=[]
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
                label:"手机号",
                name:"phone",
            },
            {
                label:"姓名",
                name:"realname",
            },
            {
                label:"性别",
                name:"sex",
            },
            {
                label:"单位",
                name:"company",
            },
            {
                label:"职务",
                name:"job",
            },
            {
                label:"状态",
                name:"status",
            },
            {
                label:"创建时间",
                name:"createtime",
            }
       ];

       goUserAdd(){
            this.$router.push({name:"userAdd"})
       }

       edit(id:any){
            this.$router.push({name:"userEdit",params:{id:id}})
       }

        del(id:any){
            this.$confirm("是否确定要删除该用户","提示",{
                showCancelButton:true
            }).then(()=>{
                delUser(id).then(data=>{
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

        changeStatus(user){
            editUserStatus(user.id,user.status).then(data=>{
                console.log(data)
            })
        }

       listUsers(page=1){
            getUsers(page).then(data=>{
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
