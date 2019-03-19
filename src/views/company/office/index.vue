<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">医院科室列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goCompanyAdd">新增科室</el-button>
                </div>
            </div>
            <el-table :data="offices" :fit="true" :stripe="true">
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

    import { getOffices,delOffice } from '@/api/hospital'

    @Component({})
    export default class CompanyOffice extends Vue{

       @Provide() offices=[]
       @Provide() company_id:number=0
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
                label:"科室",
                name:"name",
            },
            {
                label:"排序",
                name:"sort",
                sort: true
            }
       ];

       goCompanyAdd(){
            this.$router.push({name:"companyOfficeAdd",query:{company_id:this.company_id.toString()}})
       }

       edit(id:any){
            this.$router.push({name:"companyOfficeEdit",params:{id:id}})
       }

       del(id:any){
            this.$confirm("是否确定要删除该企业及关联数据","提示",{
                showCancelButton:true
            }).then(()=>{
                delOffice(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.offices=this.offices.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       listOffices(page=1){
            getOffices(this.company_id, page).then(data=>{
                this.offices=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listOffices(page)
       }

       mounted(){
            if(this.$route.query.company_id){
                this.company_id=parseInt(this.$route.query.company_id)
                this.listOffices(1)
            }else{
                this.$message.error("未指定企业")
                this.$router.back()
            }
       }
    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
