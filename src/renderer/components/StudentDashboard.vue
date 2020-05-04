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
                        <el-calendar :range="[fromDate, toDate]">
                            <template slot="dateCell" slot-scope="{date, data}">
                            <div>
                                <div>{{data.day.split('-')[2]}}</div>
                                <div v-for="item in calendarData" v-bind:key="item.things">
                                    <div v-if="(item.days).indexOf(getWeekDayFromDay(data.day))!==-1">
                                        <el-tooltip class="item" effect="dark" :content="item.things" placement="right" style="text-align: right; font-size: 12px">
                                            <div>{{item.things}}</div>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </div>
                            </template>
                        </el-calendar>
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
            calendarData: [
                {days: ['2', '4'], things: '计算机网络'},
                {days: ['4'], things: '法语文化专题'},
                {days: ['2', '4'], things: '单片机'},
                {days: ['3', '5'], things: '软件工程'}
            ],
            action_tree: {
                '1': {
                    "1": {
                        "1": "StudyInfo",
                        "2": "ChangeInfo",
                        "3": "rp-info",
                        "4": "StuInfoMove",
                        "5": "EleRegister",
                        "6": "ParentInfo",
                        "7": "MinorScheme",
                        "8": "StuCardPreserve"
                    },
                    "2": "StudentMove",
                    "3": {
                        "1": "ChooseProblem",
                        "2": "SubmitPaper",
                        "3": "QueryPaperGrade",
                        "4": "GoodPaperList"
                    }
                },
                "2": {
                    "1": {
                        "1": "CurCourseTable",
                        "2": "HisCourseTable"
                    },
                    "2": {
                        "1": "SpecialChooseCourse",
                        "2": "NormalChooseCourse",
                        "3": "ChooseCourseResult",
                        "4": "DropCourse"
                    }
                },
                "3": {
                    "1": "ComprehensiveInquiry",
                    "2": "TeachEvaluate"
                },
                "4": {
                    "1": "ExamPlan",
                    "2": "ExamGrade"
                },
                "5": {
                    "1": "CultureProgramProcess",
                    "2": "GuideProgramProcess",
                    "3": {
                        "1": "CourseAlert",
                        "2": "CoursesInfo"
                    },
                    "4": {
                        "1": "FreeClassroom",
                        "2": "OrderClassroom"
                    }
                }
            }
        }
    },
    mounted() {
        this.drawCharts();
    },
    created() {
        this.user = this.$storage.getBindUser();
        this.init_date();
        this.init_info();
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
            this.$router.push({name: act})
        },

        init_info() {
            this.info = this.$storage.getUserInfo();
            if(this.info && this.info !== "null") {
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
            if(!this.info || JSON.stringify(this.info)==='null')this.init_info();
            this.infoTable = [{
                key: '账户',
                val: this.info.user_id
            }, {
                key: '姓名',
                val: this.info.name
            }, {
                key: '性别',
                val: this.info.gender
            }, {
                key: '学院',
                val: this.info.college,
            }, {
                key: '专业',
                val: this.info.profession
            }, {
                key: '年级',
                val: this.info.grade
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

        getWeekDayFromDay(date){
            date = new Date(date)
            const fromDate = new Date(this.fromDate);
            return Math.ceil((date - fromDate) / 8.64e7).toString()
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

<style type="text/css">
    html,body,#app,.el-container{
        padding: 0;
        margin: 0;
        height: 100%;
    }
</style>