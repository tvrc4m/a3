<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">模块列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goModuleAdd">新增模块</el-button>
                </div>
            </div>
            <el-table :data="modules" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort">
                    <template slot-scope="scope">
                        <span v-if="column.name=='img'">
                            <img :src="scope.row['img']" style="width: 32px;" alt="" />
                        </span>
                        <span v-else-if="column.name=='status'">
                            <el-switch v-model="scope.row['status']" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" @change="changeStatus(scope.row)"></el-switch>
                        </span>
                        <span v-else-if="column.name=='createtime'">
                            {{scope.row['createtime'] | formatDate}}
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

    import { listModule,delModule,updateModuleStatus } from '@/api/policy'

    @Component({})
    export default class NewsIndex extends Vue{

       @Provide() modules=[]
       @Provide() params={}
       @Provide() total=0
       @Provide() pageSize=20
       @Provide() columns=[
            {
                label:"ID",
                name:"id",
                width:"60px",
                sort:true,
            },
            {
                label:"图片",
                name:"img",
            },
            {
                label:"模块名",
                name:"name",
            },
            {
                label:"排序",
                name:"sort",
                sort: true,
            },
            {
                label:"状态",
                name:"status",
                filters:[{text:"上线中",value:1},{text:"下线中",value:0}],
            },
            {
                label:"创建时间",
                name:"createtime",
            }
       ];

       goModuleAdd(){
            this.$router.push({name:"policyModuleAdd"})
       }

       edit(id:any){
            this.$router.push({name:"policyModuleEdit",params:{id:id}})
       }

        del(id:any){
            this.$confirm("是否确定要删除该新闻","提示",{
                showCancelButton:true
            }).then(()=>{
                delModule(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.modules=this.modules.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
        }

        changeStatus(module){
            updateModuleStatus(module.id,module.status)
        }

        listPolicyModule(page=1){
            listModule({page,limit:20}).then(data=>{
                this.modules=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
        }

        changePage(page){
            this.listPolicyModule(page)
        }

        mounted(){
            this.listPolicyModule(1)
        }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
