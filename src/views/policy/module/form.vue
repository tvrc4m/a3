<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}模块</span>
            </div>
            <el-form :model="module" label-width="100px" :inline="true">
                
                <el-form-item label="模块名" style="display: block;">
                    <el-input type="text" clearable v-model="module.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                      class="avatar-uploader"
                      :action="posturl"
                      :data="{folder:'module'}"
                      :on-success="handleFileSuccess"
                      :show-file-list="false">
                      <img v-if="module.img" :src="module.img" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="排序" style="display: block;">
                    <el-input type="text" clearable v-model="module.sort" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="状态" style="display: block;">
                    <el-switch v-model="module.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
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
    import { addModule,getModule,editModule } from '@/api/policy'

    @Component({})
    export default class ModuleForm extends Vue{

        @Provide() module={
            id:null,
            name:"",
            module_id:null,
            img:"",
            status:1,
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
            this.module.img=res.data.url
        }

        add(){
            if(this.is_add){
                addModule(this.module).then(data=>{
                    this.$router.push({name:"policyModuleList"})
                })
            }else{
                editModule(this.module).then(data=>{
                    this.$router.push({name:"policyModuleList"})
                })
            }
        }

        mounted(){
            if(this.$route.params.id){
                getModule(parseInt(this.$route.params.id)).then(data=>{
                    this.module=data.data
                })
                this.is_add=false
            }else{
                this.is_add=true
            }
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"policyModuleList"
                    },
                    name:"模块列表"
                }
            ])
        }
    }
</script>