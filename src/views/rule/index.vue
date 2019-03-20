<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">角色列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goAdminRuleAdd">新增角色</el-button>
                </div>
            </div>
            <el-table :data="rules" :fit="true" :stripe="true">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.is_super" type="danger" plain size="mini" @click="del(scope.row.id)">删除</el-button>
                        <el-button v-if="!scope.row.is_super" type="primary" plain size="mini" @click="edit(scope.row.id)">编辑</el-button>
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

    import { getRules,delRule } from '@/api/rule'

    @Component({})
    export default class UserIndex extends Vue{

       @Provide() rules=[]
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
                label:"角色名",
                name:"name",
            },
            {
                label:"备注",
                name:"remark",
            },
            {
                label:"创建时间",
                name:"createtime",
            }
       ];

       goAdminRuleAdd(){
            this.$router.push("/admin/rule/add")
       }

       edit(id:any){
            this.$router.push({name:"adminRuleEdit",params:{id:id}})
       }

       del(id:any){
            this.$confirm("是否确定要删除该用户","提示",{
                showCancelButton:true
            }).then(()=>{
                delRule(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.rules=this.rules.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
       }

       setPermission(rule_id){
            this.$router.push({name:"adminRulePermission",params:{id:rule_id}})
       }

       sortBySubscribe(a,b){
            console.log(a,b)
       }

       subscribe(user_id:any){
            this.$router.push({name:"userAuthor",params:{uid:user_id}})
       }

       listRules(page=1){
            getRules(page).then(data=>{
                console.log(data)
                this.rules=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listRules(page)
       }

       mounted(){
            this.listRules(1)
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
