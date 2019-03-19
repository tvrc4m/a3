<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">服务列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goServiceAdd">新增服务</el-button>
                </div>
            </div>
            <el-table :data="services" :fit="true" :stripe="true">
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
    import { getServices,delService } from '@/api/service'

    @Component({})
    export default class Service extends Vue{

       @Provide() services=[]
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

       goServiceAdd(){
            this.$router.push({name:"ServiceList"})
       }

       edit(id:any){
            this.$router.push({name:"serviceEdit",params:{id:id}})
       }

       del(id:any){
            this.$confirm("是否确定要删除该服务","提示",{
                showCancelButton:true
            }).then(()=>{
                delService(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.services=this.services.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       listServices(page=1){
            getServices(page).then(data=>{
                this.services=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listServices(page)
       }

       mounted(){
            this.listServices(1)
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
