<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}新闻</span>
            </div>
            <el-form ref="news" :model="news" label-width="100px" :inline="true">
                
                <el-form-item label="标题" style="display: block;">
                    <el-input type="text" clearable v-model="news.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源" style="display: block;">
                    <el-input type="text" clearable v-model="news.source" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面图片">
                    <el-upload
                      class="avatar-uploader"
                      :action="posturl"
                      :data="{folder:'news'}"
                      :on-success="handleFileSuccess"
                      :show-file-list="false">
                      <img v-if="news.thumb" :src="news.thumb" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="显示轮播图" style="display: block;">
                    <el-switch v-model="news.show_banner" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="轮播图" v-if="news.show_banner">
                    <el-upload
                      class="avatar-uploader"
                      :action="posturl"
                      :data="{folder:'banner'}"
                      :on-success="handleFileSuccess2"
                      :show-file-list="false">
                      <img v-if="news.banner" :src="news.banner" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="轮播图排序" style="display: block;" v-if="news.show_banner">
                    <el-input type="text" clearable v-model="news.banner_sort" autocomplete="off"></el-input>
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
    import { addNews,getNews,editNews } from '@/api/news'

    @Component({})
    export default class NewsForm extends Vue{

        @Provide() news={
            id:null,
            title:"",
            source:"",
            thumb:"",
            status:1,
            content:"",
            show_banner:0,
            banner:"",
            banner_sort:null,
            sort:null,
        }
        @Provide() is_add:boolean=false

        get btnname():string{
            return this.is_add?"添加":"编辑"
        }

        get posturl(){
            return process.env.API_URL+"/admin/upload/image"
        }

        handleFileSuccess(res, file){
            this.news.thumb=res.data.url
        }

        handleFileSuccess2(res, file){
            this.news.banner=res.data.url
        }

        add(){
            if(this.is_add){
                addNews(this.news).then(data=>{
                    this.$router.push({name:"newsList"})
                })
            }else{
                editNews(this.news).then(data=>{
                    this.$router.push({name:"newsList"})
                })
            }
        }

        mounted(){
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
                        name:"newsList"
                    },
                    name:"新闻列表"
                }
            ])
        }
    }
</script>