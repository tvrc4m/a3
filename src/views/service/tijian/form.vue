<template>
    <el-container>
        <el-card>
            <div class="header" slot="header">
                <span class="title">服务配置</span>
            </div>
            <el-form ref="company" :model="setting" label-width="130px" :inline="true">
                <el-form-item label="周末是否接受预约" prop="address" style="display: block;">
                    <el-switch v-model="setting.weekend" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
                <div style="margin-left: 150px;">
                    <el-button type="primary" size="small" @click="add">保存</el-button>
                </div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script lang="ts">
    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { getCompany,addCompany,editCompany,getTypes } from '@/api/company'
    import { mapMutations } from 'vuex'

    @Component({
        components:{},
    })
    export default class AdminUserForm extends Vue{

        @Provide() setting={
            id:0,
            weekend:null,

        }
        mounted(){
            
        }
    }
</script>