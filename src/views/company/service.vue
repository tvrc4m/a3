<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">企业服务</span>
            </div>
            <el-tag
              v-for="service in services"
              :key="service.name"
              closable>
              {{service.name}}
            </el-tag>
            </div>
        </el-card>
    </el-container>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'

    import { getAllServices } from '@/api/service'

    @Component({})
    export default class CompanyService extends Vue{

       @Provide() services=[]
       @Provide() tags=[
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

       
       edit(id:any){
            this.$router.push({name:"companyEdit",params:{id:id}})
       }

       del(id:any){
            this.$confirm("是否确定要删除该企业及关联数据","提示",{
                showCancelButton:true
            }).then(()=>{
                // delCompany(id).then(data=>{
                //     this.$message({
                //         type:"success",
                //         message:"删除成功"
                //     })
                //     this.services=this.services.filter(item=>{
                //         if(item.id!=id){
                //             return true
                //         }
                //     })
                // })
            }).catch(()=>{
                
            })
       }

       mounted(){
            getAllServices().then(data=>{
                this.services=data.data
            })
       }
    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
