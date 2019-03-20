<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">家庭医生服务</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="addNewDoctor">新增家庭医生</el-button>
                </div>
            </div>
            <el-table :data="doctors" :fit="true" :stripe="true">
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
    import { getDoctors,delDoctor } from '@/api/service/doctor'
    import { getCompany } from '@/api/company'

    @Component({})
    export default class Service extends Vue{

       @Provide() doctors=[]
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
                label:"姓名",
                name:"name",
            },
            {
                label:"联系电话",
                name:"tel",
            },
            {
                label:"预约时间",
                name:"time",
            },
            {
                label:"备注",
                name:"remark",
            },
       ];

        @Watch("$route")
        changeRoute(route){
            if(route.name=='serviceList'){
                this.doctors=[]
                this.service={alias:""}
                this.service.alias=route.params.alias
                this.listDoctors(1)
            }
        }

        addNewDoctor(){
            this.$router.push({name:"JiatingDoctorAdd",query:{company_id:this.company.id.toString()}})
        }

        edit(id:any){
            this.$router.push({name:"JiatingDoctorEdit",params:{id:id},query:{company_id:this.company.id.toString()}})
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
                //     this.doctors=this.doctors.filter(item=>{
                //         if(item.id!=id){
                //             return true
                //         }
                //     })
                // })
            }).catch(()=>{
                
            })
       }

       listDoctors(page=1){
            getDoctors(this.company.id, page).then(data=>{
                this.doctors=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listDoctors(page)
       }

       mounted(){
            this.company.id=parseInt(this.$route.params.id)
            this.listDoctors(1)
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
