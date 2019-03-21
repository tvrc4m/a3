<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}新闻</span>
            </div>
            <el-form ref="news" :model="news" label-width="100px" :inline="true">
                <el-form-item label="模块" prop="type" style="display: block;">
                    <el-select v-model="news.module_id" placeholder="请选择模块">
                        <el-option v-for="m in modules" :key="m.id" :label="m.name" :value="m.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" style="display: block;">
                    <el-input type="text" clearable v-model="news.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" style="display: block;">
                    <el-input type="textarea" clearable v-model="news.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" style="display: block;">
                    <el-input type="text" clearable v-model="news.sort" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="状态" style="display: block;">
                    <el-switch v-model="news.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <div style="margin-left: 150px;">
                    <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
                </div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { addNews,getNews,editNews,listModule } from '@/api/policy'
    import { mapState,mapActions } from 'vuex'
    @Component({})
    export default class NewsForm extends Vue{

        @Provide() news={
            id:null,
            title:"",
            module_id:null,
            status:1,
            content:"",
            sort:null,
        }
        @Provide() is_add:boolean=false
        @Provide() modules=this.$store.state.policy.modules

        get btnname():string{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addNews(this.news).then(data=>{
                    this.$router.push({name:"policyNewsList"})
                })
            }else{
                editNews(this.news).then(data=>{
                    this.$router.push({name:"policyNewsList"})
                })
            }
        }

        mounted(){
            this.$store.dispatch("policy/listPolicyModules")
            if(this.$route.params.id){
                getNews(parseInt(this.$route.params.id)).then(data=>{
                    this.news=data.data
                })
                this.is_add=false
            }else{
                this.is_add=true
            }
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"policyNewsList"
                    },
                    name:"新闻列表"
                }
            ])
        }
    }
</script>