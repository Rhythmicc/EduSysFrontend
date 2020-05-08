<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="管理员主页" style="margin-top: 27px" @back="goback"></el-page-header>
            </el-col>
            <el-col :span="8" style="width: 80%">
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" style="float: right">
                    <el-submenu index="1">
                        <template slot="title"><el-badge :value="12" :max="9" style="margin-top: 10px;">代办事项</el-badge></template>
                        <el-menu-item>1212</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-header>
        <el-container style="height: 100%">
            <el-aside width="240px" style="background-color: rgb(238, 241, 246); -webkit-app-region: no-drag">
                <el-menu class="el-menu-vertical-demo" @select="handleSelect" :default-active="activeIndex">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            信息管理
                        </template>
                        <el-menu-item index="1-1">学籍管理</el-menu-item>
                        <el-menu-item index="1-2">个人信息</el-menu-item>
                        <el-menu-item index="1-3">学籍异动</el-menu-item>
                        <el-menu-item index="1-4">奖惩信息</el-menu-item>
                        <el-menu-item index="1-5">电子注册</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2"><i class="el-icon-s-claim"></i>特殊选课</el-menu-item>
                    <el-menu-item index="3"><i class="el-icon-message-solid"></i>考务审批</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main height="100%">
                <el-row style="-webkit-app-region: no-drag" :gutter="5">
                    <el-col style="width: 50%;">
                        <el-card shadow="hover">
                            <div slot="header"><span>个人信息</span></div>
                            <div v-for="item in infoTable" v-bind:key="item.key"><p>{{item.key + '：' + item.val}}</p></div>
                        </el-card>
                    </el-col>
                    <el-col style="width: 50%">
                        <el-card shadow="hover">
                            <el-switch
                                    v-model="elective_flag"
                                    active-text="开启选课"
                                    inactive-text="关闭选课" @change="elective">
                            </el-switch>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row style="-webkit-app-region: no-drag" :gutter="5">
                    <el-card :span="8" style="width: 100%" shadow="hover">
                        TODO: develop
                    </el-card>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import request from 'request-promise'
    export default {
        data() {
            return {
                info: '',
                infoTable: [],
                activeIndex: '',
                fromDate: '',
                toDate: '',
                elective_flag: '关闭选课',
                action_tree: {
                    "1": {
                        "1": "StudentInfoManage",
                        "2": "ChangeInfo",
                        "3": "StudentMoveManage",
                        "4": "RewardInfoUpload",
                        "5": "EleRegisterManage"
                    },
                    "2": "SpecialElective",
                    "3": "ExamApprove"
                }
            }
        },
        mounted() {
            this.init_info();
            this.drawCharts();
        },
        created() {
            this.user = this.$storage.getBindUser();
            this.init_date();
        },
        methods: {
            goback(){
                this.$router.push({name: 'login-page'})
            },

            handleSelect(key, keyPath) {
                let road = key.split('-')
                let act = this.action_tree;
                for(const i in road)act = act[road[i]]
                if(act === 'ChangeInfo') this.$storage.saveSessionObject('role', 0);
                this.$router.push({name: act})
            },

            init_info() {
                this.info = this.$storage.getUserInfo();
                if(JSON.stringify(this.info)!=='null'){
                    this.init_info_table();
                    return
                }
                request({
                    uri: this.$storage.address() + 'info/student/' + this.user.user_id,
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.info = res;
                    this.info.gender = res.gender?'男':'女'
                    this.$storage.saveUserInfo(this.info)
                    this.init_info_table();
                }).catch(err => {
                    this.$message.error(err);
                });
            },

            init_info_table() {
                if(JSON.stringify(this.info)==='null')this.init_info();
                this.infoTable = [{
                    key: '账户',
                    val: this.info.user_id
                }, {
                    key: '姓名',
                    val: this.info.name
                }, {
                    key: '性别',
                    val: this.info.gender
                }]
            },

            formatDate(date) {
                const y = date.getFullYear();
                const m = date.getMonth() + 1;
                const d = date.getDate();
                return y + '-' + m + '-' + d;
            },

            init_date() {
                const now = new Date();
                const dayOfWeek = now.getDay();
                this.fromDate = this.formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 1));
                this.toDate = this.formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 7));
            },

            elective() {
                if(this.elective_flag === '开启选课')request({
                    uri: this.$storage.address() + 'activity/EnableActivity/elective',
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.$message({
                        message: res.status?'开启成功': '开启失败',
                        type: res.status?'success': 'error'
                    })
                }).catch(error => {this.$message.error('Request Failed')});
                else request({
                    uri: this.$storage.address() + 'activity/DisableActivity/elective',
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.$message({
                        message: res.status?'关闭成功': '关闭失败',
                        type: res.status?'success': 'error'
                    })
                }).catch(error => {this.$message.error('Request Failed')});
            }
        }
    };
</script>

<style lang="scss">
    @import "../style/params";

    .layout {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .center {
        align-items: center;
        justify-content: center;
        width: 60%;
    }

    .title {
        width: 100%;
        text-align: center;
        padding: 10px;
    }

    .table {
        width: 60%;
    }

    .buttons {
        margin-top: 50px;
    }
</style>

<style type="text/css">
    html,body,#app,.el-container{
        padding: 0;
        margin: 0;
        height: 100%;
    }
</style>
