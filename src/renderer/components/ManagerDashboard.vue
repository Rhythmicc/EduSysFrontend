<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="学生主页" style="margin-top: 27px" @back="goback"></el-page-header>
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
                        <el-submenu index="1-1">
                            <template slot="title">学籍管理</template>
                            <el-menu-item index="1-1-1">学生学籍管理</el-menu-item>
                            <el-menu-item index="1-1-2">个人信息修改</el-menu-item>
                            <el-menu-item index="1-1-3">学籍异动管理</el-menu-item>
                            <el-menu-item index="1-1-4">奖惩信息发布</el-menu-item>
                            <el-menu-item index="1-1-5">电子注册管理</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="1-2">学生异动登记</el-menu-item>
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
                            <div id="CPLchart" style="width: 100%; height: 303px;"></div>
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
    import echarts from 'echarts'
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
                this.$router.push({name: 'login-page'})
            },

            handleSelect(key, keyPath) {
                console.log(key, keyPath);
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

            drawCharts() {
                let chart = echarts.init(document.getElementById('CPLchart'))
                const option = {
                    title: {
                        text: '保有储量变化图',
                        subtext: '一次能源'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['煤', '石油', '天然气']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
                            splitNumber: 10
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '煤',
                            type: 'bar',
                            data: [1683.47, 1654.23, 1640.12, 1641.6, 1639.68, 1642.7, 1610.41, 1639.45, 1722.2],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '石油',
                            type: 'bar',
                            data: [22490.2, 24947.67, 29844.34, 31397.94, 33713, 36300.8, 38445.3, 38375.6, 38158.7],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '天然气',
                            type: 'bar',
                            data: [5502.54, 5628.11, 5478, 6376.26, 6231.14, 8047.88, 7857.1, 7802.5, 8695.01],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                chart.setOption(option);
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
