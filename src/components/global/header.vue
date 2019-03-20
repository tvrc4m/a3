<template>
    <div class="global-header">
        <div class="left">
            <h2>凤凰之家综合运营管理平台</h2>
        </div>
        <div class="right">
            <div class="actions">
                <span class="action" @click="logout">退出</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component,Provide,Vue } from 'vue-property-decorator'

    @Component({})
    export default class GlobalHeader extends Vue{

        // @Provide() logo:String='@/assets/logo.png'

        logout(){
            localStorage.removeItem('token')
            this.$router.push('/login')
        }
    }
</script>

<style lang="scss" scoped>
    .global-header {
        height: 64px;
        padding: 0 12px 0 0;
        background: rgb(64, 158, 255);
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        position: relative;
        display: flex;
        justify-content: space-between;

        .trigger {
            font-size: 20px;
            line-height: 64px;
            cursor: pointer;
            transition: all 0.3s;
            padding: 0 24px;
            &:hover {
                background: $primary-1;
            }
        }
        .actions{
            text-align: center;
            &.popover-open,
            &:hover {
                background: $primary-1;
            }
            &.active{
                background-color:$primary-1;
            }
        }
        .action {
            cursor: pointer;
            transition: all 0.3s;
            height: 100%;
            display: flex;
            align-items: center;
            > i {
                font-size: 16px;
                vertical-align: middle;
            }
        }
        .lang {
            cursor: pointer;
            padding: 0 12px;
            transition: all 0.3s;
            height: 100%;
            width: 100px;
            display: flex;
            align-items: center;
            text-align: center;
            color:#40a9ff;
            font-size:14px;
            font-weight:bold;
            > i {
                font-size: 16px;
                vertical-align: middle;
            }
            &.popover-open,
            &:hover {
                background: $primary-1;
            }
        }
        .search {
            padding: 0;
            margin: 0 12px;
            &:hover {
                background: transparent;
            }
        }
        .left,.right{
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            padding-left:20px;
            .actions{
                line-height:64px;
                height:64px;
                width:80px;
                padding:0 5px;
                text-align:center;
                .action{
                    display:inline-block;
                    width:100%;
                }
            }
            .item{
                cursor: pointer;
                padding: 0 12px;
                transition: all 0.3s;
                height: 100%;
                padding:0 10px;
                display: flex;
                align-items: center;
                text-align: center;
                font-size:14px;
                font-weight:bold;
                &.first{
                    margin-left:30px;
                }
            }
        }
        .right {
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            .notice {
                padding: 0;
            }
            .account {
                .avatar {
                    margin: 20px 8px 20px 0;
                    color: $primary-color;
                    background: rgba(255, 255, 255, 0.85);
                    vertical-align: middle;
                }
            }
            .loading-wrapper {
                .loading {
                    width: 30px;
                    height: 30px;

                    /deep/ .el-loading-spinner {
                        margin-top: -15px;
                        .circular {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>
