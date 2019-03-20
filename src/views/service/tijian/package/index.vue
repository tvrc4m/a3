<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">体检套餐管理</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="addNewPackage">新增体检套餐</el-button>
                    <el-button type="primary" size="small" @click="addNewPackage">体检配置</el-button>
                </div>
            </div>
            <el-table :data="packages" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row[column.name]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" @click="del(scope.row.id)">删除</el-button>
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
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { getPackages,delPackage } from '@/api/service/package'
    import { getCompany } from '@/api/company'

    @Component({})
    export default class Service extends Vue{

       @Provide() packages=[]
       @Provide() company={id:0}
       @Provide() service={alias:""}
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() columns=[
            {
                label:"ID",
                name:"id",
            },
            {
                label:"套餐",
                name:"name",
            },
            {
                label:"内容说明",
                name:"content",
            }
       ];

        @Watch("$route")
        changeRoute(route){
            if(route.name=='serviceList'){
                this.packages=[]
                this.service={alias:""}
                this.service.alias=route.params.alias
                this.listPackages(1)
            }
        }

        addNewPackage(){
            this.$router.push({name:"TijianPakcageAdd",query:{company_id:this.company.id.toString()}})
        }

        edit(id:any){
            this.$router.push({name:"TijianPakcageEdit",params:{id:id},query:{company_id:this.company.id.toString()}})
        }

       del(id:any){
            this.$confirm("是否确定要删除该服务","提示",{
                showCancelButton:true
            }).then(()=>{
                // delService(id).then(data=>{
                //     this.$message({
                //         type:"success",
                //         message:"删除成功"
                //     })
                //     this.packages=this.packages.filter(item=>{
                //         if(item.id!=id){
                //             return true
                //         }
                //     })
                // })
            }).catch(()=>{
                
            })
       }

       listPackages(page=1){
            getPackages(this.company.id, page).then(data=>{
                this.packages=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listPackages(page)
       }

       mounted(){
            console.log(this.$route.params)
            this.company.id=parseInt(this.$route.params.id)
            this.listPackages(1)
            getCompany(this.company.id).then(data=>{
                this.$store.commit("setBreadcrumb",[
                    {
                        route:{
                            name:"companyList",
                        },
                        name:"企业列表"
                    },
                    {
                        route:{
                            name:"companyEdit",
                            params:{
                                id:
                                data.data.id
                            }
                        },
                        name:data.data.name
                    }
                ])
            })
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
