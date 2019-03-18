<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">企业类型列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goCompanyTypeAdd">新增企业类型</el-button>
                </div>
            </div>
            <el-table :data="types" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                        [<el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button>] 
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-container>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'

    import { getTypes,delType } from '@/api/company'

    @Component({})
    export default class UserIndex extends Vue{

       @Provide() types=[]
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
                label:"类型",
                name:"name",
            }
       ];

       goCompanyTypeAdd(){
            this.$router.push({name:"companyTypeAdd"})
       }

       edit(id:any){
            this.$router.push({name:"companyTypeEdit",params:{id:id}})
       }

       del(id:any){
            this.$confirm("是否确定要删除该类型","提示",{
                showCancelButton:true
            }).then(()=>{
                delType(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.types=this.types.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       mounted(){
            getTypes().then(data=>{
                this.types=data.data.data
            })
       }
    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
