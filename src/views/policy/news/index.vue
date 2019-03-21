<template>
    <el-container>
        <el-card style="width: 100%">
            <div class="header" slot="header">
                <span class="title">政策速递--新闻列表</span>
                <div class="actions">
                    <el-button type="primary" size="small" @click="goNewsAdd">新增新闻</el-button>
                </div>
            </div>
            <el-table :data="newslist" :fit="true" :stripe="true" @filter-change="filterHandler">
                <el-table-column v-for="column in columns" :prop="column.name" :label="column.label" :width="column.width" align="center" :sortable="column.sort" :column-key="column.name" :filters="column.filters" :filter-multiple="false">
                    <template slot-scope="scope">
                        <span v-if="column.name=='createtime'">
                            {{scope.row['createtime'] | formatDate}}
                        </span>
                        <span v-else-if="column.name=='thumb'">
                            <img :src="scope.row['thumb']" style="width: 32px;" alt="" />
                        </span>
                        <span v-else-if="column.name=='module_id'">
                            {{getModuleName(scope.row['module_id'])}}
                        </span>
                        <span v-else-if="column.name=='show_banner'">
                            <el-switch v-model="scope.row['show_banner']" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" @change="changeBannerStatus(scope.row)"></el-switch>
                        </span>
                        <span v-else-if="column.name=='status'">
                            <el-switch v-model="scope.row['status']" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" @change="changeStatus(scope.row)"></el-switch>
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

    import { listNews,delNews,updateNewsStatus } from '@/api/policy'

    @Component({})
    export default class NewsIndex extends Vue{

       @Provide() newslist=[]
       @Provide() params={}
       @Provide() total=0
       @Provide() pageSize=20

       get columns(){
            let filter_modules=[]
            this.modules.forEach(item=>{
                filter_modules.push({text: item.name, value: item.id})
            })
            return [
                {
                    label:"ID",
                    name:"id",
                    width:"60px",
                    sort:true,
                },
                {
                    label:"模块",
                    name:"module_id",
                    filters:filter_modules,
                },
                {
                    label:"标题",
                    name:"title",
                },
                {
                    label:"排序",
                    name:"sort",
                    sort:true,
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
            ]
        }

        @Provide() modules=this.$store.state.policy.modules

        getModuleName(module_id){
            for(let index in this.modules){
                if(this.modules[index].id==module_id){
                    return this.modules[index].name
                }
            }
        }

        goNewsAdd(){
            this.$router.push({name:"policyNewsAdd"})
        }

        edit(id:any){
            this.$router.push({name:"policyNewsEdit",params:{id:id}})
        }

        del(id:any){
            this.$confirm("是否确定要删除该新闻","提示",{
                showCancelButton:true
            }).then(()=>{
                delNews(id).then(data=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.newslist=this.newslist.filter(item=>{
                        if(item.id!=id){
                            return true
                        }
                    })
                })
            }).catch(()=>{
                
            })
        }

        changeStatus(news){
            updateNewsStatus(news.id,news.status)
        }

        filterBannerHandler(value,row,column){
            this.params['show_banner']=value
            this.listModuleNews(1)
            return true
        }

        filterHandler(filters){
            console.log(filters)
            for(let filter in filters){
                this.params[filter]=filters[filter][0]
            }
            this.listModuleNews(1)
            return true
        }

       listModuleNews(page=1){
            this.params['page']=page
            this.params['limit']=20
            listNews(this.params).then(data=>{
                this.newslist=data.data.data
                this.total=data.data.total
                this.pageSize=data.data.size
            })
       }

       changePage(page){
            this.listModuleNews(page)
       }

       mounted(){
            this.$store.dispatch("policy/listPolicyModules")
            this.listModuleNews(1)
       }

    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button{
        margin-left:0 !important;
    }
</style>
