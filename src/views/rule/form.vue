<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">{{btnname}}角色</span>
            </div>
            <el-form ref="rule" :model="rule" label-width="100px" :inline="true">
                <el-form-item label="角色名" prop="name" style="display: block;">
                    <el-input type="text" v-model="rule.name" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注说明" prop="remark" style="display: block;">
                    <el-input type="text" v-model="rule.remark" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设置权限" prop="remark" style="display: block;">
                    <el-tree
                        ref="tree"
                        style="max-height: 300px;"
                        :data="paths"
                        show-checkbox
                        node-key="value"
                        :default-expand-all="true"
                        :props="defaultProps">
                    </el-tree>
                </el-form-item>
                <div style="margin-left: 150px;">
                    <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
                </div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { addRule,getRule,editRule,getPaths } from '@/api/rule'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminRuleForm extends Vue{

        @Provide() rule={
            id:0,
            name:"",
            remark:"",
            paths:""
        }
        @Provide() is_add:Boolean=false
        @Provide() paths=[]
        @Provide() selected=[]
        @Provide() defaultProps={
            children: 'children',
            label: 'label'
        }

        $refs:{
            tree:any
        }

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            let nodes=this.$refs.tree.getCheckedNodes()
            this.selected=[]
            nodes.forEach(item=>{
                this.selected.push(item.value)
            })
            this.rule.paths=this.selected.join(",")
            if(this.is_add){
                addRule(this.rule).then(data=>{
                    this.$router.push({name:"adminRule"})
                })
            }else{
                editRule(this.rule).then(data=>{
                    console.log('edituser',data)
                    this.$router.push({name:"adminRule"})
                })
            }
        }

        mounted(){
            if(this.$route.params.id){
                this.is_add=false
                Promise.all([getPaths(),getRule(parseInt(this.$route.params.id))]).then(([paths,rule])=>{
                    this.paths=paths.data
                    this.rule=rule.data
                    setTimeout(()=>{
                        this.rule.paths.split(",").forEach(id=>{
                            this.$refs.tree.setChecked(id,true)
                        })
                    },200)
                })
            }else{
                this.is_add=true
                getPaths().then(data=>{
                    this.paths=data.data
                })
            }
            
            this.$store.commit("setBreadcrumb",[
                {
                    route:{
                        name:"adminRule"
                    },
                    name:"后台角色列表"
                }
            ])
        }
    }
</script>