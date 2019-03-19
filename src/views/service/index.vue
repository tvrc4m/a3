<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">『{{service.name}}』 -- 企业列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goServiceCompany">新增企业</el-button>
                </div>
            </div>
            <el-table :data="companies" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort">
                    <template slot-scope="scope">
                        <span v-if="column.name=='logo'">
                            <img :src="scope.row[column.name]" style="width: 30px;" alt="" />
                        </span>
                        <span v-else>{{scope.row[column.name]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        [<el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>]
                        [<el-button type="text" size="mini" @click="goSetting(scope.row.id)">配置</el-button>] 
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
    import { getServices,getService,getServiceCompany } from '@/api/service'

    @Component({})
    export default class Service extends Vue{

       @Provide() companies=[]
       @Provide() service={alias:""}
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() columns=[
            {
                label:"logo",
                name:"logo",
            },
            {
                label:"企业名",
                name:"name",
            }
       ];

       @Watch("$route")
       changeRoute(route){
            if(route.name=='serviceList'){
                this.companies=[]
                this.service={alias:""}
                this.service.alias=route.params.alias
                this.listServiceCompany(1)
            }
       }

       goServiceCompany(){
            this.$router.push({name:"ServiceSetting"})
       }

       goSetting(id:any){
            console.log("id:",id)
            console.log({alias:this.service.alias,id:id})
            this.$router.push({name:"ServiceSetting",params:{alias:this.service.alias,id:id}})
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
                //     this.companies=this.companies.filter(item=>{
                //         if(item.id!=id){
                //             return true
                //         }
                //     })
                // })
            }).catch(()=>{
                
            })
       }

       listServiceCompany(page=1){
            getServiceCompany(this.service.alias,page).then(data=>{
                this.companies=data.data.data
                this.service=data.data.service
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listServiceCompany(page)
       }

       mounted(){
            this.service.alias=this.$route.params.alias
            this.listServiceCompany(1)
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
