<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">订单列表</span>
            </div>
            <el-table :data="companies" :fit="true" :stripe="true">
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
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'

    import { getCompanies,delCompany } from '@/api/company'

    @Component({})
    export default class OrderIndex extends Vue{

       @Provide() companies=[]
       @Provide() total=0
       @Provide() pageSize=20
       // @Provide() service_alias_all=[''];
       @Provide() service_alias=""

       get columns(){
            switch(this.service_alias){
                case 'jiuzhen':return [
                    {
                        label:"ID",
                        name:"id",
                        width:"60px",
                        sort:true
                    },
                    {
                        label:"预约用户",
                        name:"user",
                    },
                    {
                        label:"预约医院",
                        name:"company",
                    },
                    {
                        label:"预约时间",
                        name:"contact",
                    }
                ];
                default: return []
            }
       }

       @Watch("$route")
       changeRoute(route){
            if(this.service_alias!=route.params.name){
                this.service_alias=route.params.name
            }
       }

       edit(id:any){
            this.$router.push({name:"companyEdit",params:{id:id}})
       }

       listOrders(page=1){
            getCompanies(page).then(data=>{
                this.companies=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listOrders(page)
       }

       mounted(){
            if(this.$route.params.name){
                this.service_alias=this.$route.params.name
            }else{
                this.$message.error("该服务不存在")
                this.$router.back();
            }
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
