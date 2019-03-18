<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">企业列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goCompanyAdd">新增企业</el-button>
                </div>
            </div>
            <el-table :data="companies" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                        [<el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>] 
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

    import { getCompanies,delCompany } from '@/api/company'

    @Component({})
    export default class UserIndex extends Vue{

       @Provide() companies=[]
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
                label:"企业名",
                name:"name",
            },
            {
                label:"企业类型",
                name:"type",
            },
            {
                label:"联系人",
                name:"contact",
            },
            {
                label:"联系人电话",
                name:"tel",
            },
            {
                label:"地址",
                name:"address",
            },
            {
                label:"排序",
                name:"sort",
            },
            {
                label:"创建时间",
                name:"createtime",
            }
       ];

       goCompanyAdd(){
            this.$router.push("/company/add")
       }

       edit(id:any){
            this.$router.push({name:"companyEdit",params:{id:id}})
       }

       del(id:any){
            this.$confirm("是否确定要删除该企业及关联数据","提示",{
                showCancelButton:true
            }).then(()=>{
                delCompany(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.companies=this.companies.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       sortBySubscribe(a,b){
            console.log(a,b)
       }

       subscribe(user_id:any){
            this.$router.push({name:"userAuthor",params:{uid:user_id}})
       }

       listUsers(page=1){
            getCompanies(page).then(data=>{
                this.companies=data.data.data
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
