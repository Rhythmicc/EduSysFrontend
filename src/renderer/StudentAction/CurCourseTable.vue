<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="学生主页" style="margin-top: 27px" @back="goback"></el-page-header>
            </el-col>
            <el-col :span="8" style="width: 80%">
                <el-menu class="el-menu-demo" mode="horizontal" @select="headerSelect" style="float: right">
                    <el-submenu index="1">
                        <template slot="title"><el-badge :value="12" :max="9" style="margin-top: 10px;">消息</el-badge></template>
                        <el-menu-item>1212</el-menu-item>
                    </el-submenu>
                    <el-submenu index=2>
                        <template slot="title"><el-badge :value="3" :max="9" style="margin-top: 10px;">代办事项</el-badge></template>
                        <el-menu-item>33</el-menu-item>
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
                            个人管理
                        </template>
                        <el-submenu index="1-1">
                            <template slot="title">学籍管理</template>
                            <el-menu-item index="1-1-1">学生学籍信息</el-menu-item>
                            <el-menu-item index="1-1-2">个人信息修改</el-menu-item>
                            <el-menu-item index="1-1-3">学籍异动</el-menu-item>
                            <el-menu-item index="1-1-4">奖惩信息</el-menu-item>
                            <el-menu-item index="1-1-5">电子注册</el-menu-item>
                            <el-menu-item index="1-1-6">监护人信息采集</el-menu-item>
                            <el-menu-item index="1-1-7">辅修方案</el-menu-item>
                            <el-menu-item index="1-1-8">学生证信息维护</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="1-2">学生异动</el-menu-item>
                        <el-submenu index="1-3">
                            <template slot="title">毕业设计</template>
                            <el-menu-item index="1-3-1">网上选题</el-menu-item>
                            <el-menu-item index="1-3-2">论文提交</el-menu-item>
                            <el-menu-item index="1-3-3">毕业设计成绩查询</el-menu-item>
                            <el-menu-item index="1-3-4">优秀毕业设计名单</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-claim"></i>
                            课程管理
                        </template>
                        <el-submenu index="2-1">
                            <template slot="title">课表</template>
                            <el-menu-item index="2-1-1">本学期课表</el-menu-item>
                            <el-menu-item index="2-1-2">历史课表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-2">
                            <template slot="title">选课管理</template>
                            <el-menu-item index="2-2-1">特殊选课</el-menu-item>
                            <el-menu-item index="2-2-2">普通选课</el-menu-item>
                            <el-menu-item index="2-2-3">选课结果</el-menu-item>
                            <el-menu-item index="2-2-4">退课申请</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            教学评估
                        </template>
                        <el-menu-item index="3-1">综合调查</el-menu-item>
                        <el-menu-item index="3-2">教学评估</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-message-solid"></i>
                            考务管理
                        </template>
                        <el-menu-item index="4-1">考试安排</el-menu-item>
                        <el-menu-item index="4-2">考试成绩</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-search"></i>
                            综合查询
                        </template>
                        <el-menu-item index="5-1">培养方案完成情况</el-menu-item>
                        <el-menu-item index="5-2">指导计划完成情况</el-menu-item>
                        <el-submenu index="5-3">
                            <template slot="title">课程</template>
                            <el-menu-item index="5-3-1">课程通知</el-menu-item>
                            <el-menu-item index="5-3-2">课程属性</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5-4">
                            <template slot="title">教室</template>
                            <el-menu-item index="5-4-1">空闲教室</el-menu-item>
                            <el-menu-item index="5-4-2">预约教室</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main height="100%">
                <el-table>

                </el-table>
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
                this.$storage.saveUserInfo("null")
                this.$router.push({name: 'login-page'})
            },

            headerSelect(key, keyPath){
                if(key === "1")console.log(key)
                else console.log(key)
            },

            handleSelect(key, keyPath) {
                let road = key.split('-')
                let act = this.action_tree;
                for(const i in road)act = act[road[i]]
                console.log(act)
                //this.$router.push({name: act})
            },

            init_info() {
                this.info = this.$storage.getUserInfo();
                if(this.info && JSON.stringify(this.info) !== "null") {
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