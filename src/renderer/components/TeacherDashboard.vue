<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="教师主页" style="margin-top: 27px" @back="goback"></el-page-header>
            </el-col>
            <el-col :span="8" style="width: 80%">
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" style="float: right">
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
                    <el-menu-item index="1"><i class="el-icon-s-custom"></i>个人管理</el-menu-item>
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
                        <el-menu-item index="2-2">授课管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            教学评估
                        </template>
                        <el-menu-item index="3-1">评估结果</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-message-solid"></i>
                            考务管理
                        </template>
                        <el-menu-item index="4-1">申请考试</el-menu-item>
                        <el-menu-item index="4-2">成绩发布</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-search"></i>
                            综合查询
                        </template>
                        <el-submenu index="5-1">
                            <template slot="title">课程</template>
                            <el-menu-item index="5-1-1">课程通知</el-menu-item>
                            <el-menu-item index="5-1-2">课程属性</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5-2">
                            <template slot="title">教室</template>
                            <el-menu-item index="5-2-1">空闲教室</el-menu-item>
                            <el-menu-item index="5-2-2">预约教室</el-menu-item>
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
                                <div>{{data.day.split('-')[2]}}</div>
                                <el-tooltip class="item" effect="dark"
                                            placement="right" style="text-align: right; font-size: 12px"
                                            v-for="course in calendarData[getWeekDayFromDay(data.day)]" v-bind:key="course['course']"
                                            :content="course['loc']">
                                    <div>{{course['course']}}</div>
                                </el-tooltip>
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
    import chinaJson from 'echarts/map/json/china.json'
    export default {
        data() {
            return {
                info: '',
                infoTable: [],
                activeIndex: '',
                fromDate: '',
                toDate: '',
                calendarData: [],
                tm_ls: ['8:00', '10:05', '13:30', '15:30', '18:30', '20:30'],
                action_tree: {
                    "1": "ChangeInfo",
                    "2": {
                        "1": {
                            "1": "CurCourseTable",
                            "2": "HisCourseTable"
                        },
                        "2": "CoursesManage"
                    },
                    "3": {
                        "1": "EvaluateResult",
                    },
                    "4": {
                        "1": "ApplyExam",
                        "2": "UploadGrade"
                    },
                    "5": {
                        "1": {
                            "1": "CourseAlert",
                            "2": "CoursesInfo"
                        },
                        "2": {
                            "1": "FreeClassroom",
                            "2": "OrderClassroom"
                        }
                    }
                }
            }
        },
        mounted() {
            this.$echarts.registerMap('china', chinaJson);
            this.init_calendar(0);
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
                this.$storage.saveSessionObject('Schedule', null)
                this.$router.push({name: 'login-page'})
            },

            headerSelect(key, keyPath){
                if(key === "1")console.log(key)
                else console.log(key)
            },

            init_calendar(depth) {
                if(depth > 5){
                    this.$message.error('Max Tried Limited!')
                    return
                }
                let calendar = this.$storage.getSessionObject("Schedule")
                if(calendar === null) {
                    request({
                        uri: this.$storage.address() + 'course/Teacher/Schedule/' + this.user.user_id,
                        method: 'GET',
                        json: true
                    }).then(res => {
                        this.$storage.saveSessionObject('Schedule', res);
                        this.init_calendar(depth + 1)
                    }).catch(error => {
                        this.$message.error(error)
                    })
                }
                this.calendarData = {}
                for(let i=1;i<=7;++i) {
                    let index = i.toString();
                    this.calendarData[index] = []
                    for (let j = 0; j < 7; ++j) this.calendarData[index].push({})
                }
                for(let i in calendar) {
                    let time_ls = calendar[i][0].split(' ')
                    let course_name = calendar[i][1]
                    let loc_ls = calendar[i][2].split(' ')
                    for(let j in time_ls){
                        time_ls[j] = time_ls[j].split(':')
                        time_ls[j][0] = time_ls[j][0].split(',')
                        time_ls[j][1] = time_ls[j][1].split('-')
                    }
                    let loc_ls_index = 0;
                    for(let week_day in time_ls) {
                        week_day = time_ls[week_day];
                        let days = week_day[0];
                        let cors = week_day[1];
                        cors[0] = parseInt(cors[0]);
                        for(let day in days){
                            this.calendarData[days[day]][cors[0]]['course'] = course_name;
                            this.calendarData[days[day]][cors[0]]['loc'] = this.tm_ls[cors[0]-1] + '> ' + loc_ls[loc_ls_index];
                            loc_ls_index = (loc_ls_index + 1) % loc_ls.length
                        }
                    }
                }
                for(let i=1;i<=7;++i){
                    let index = i.toString();
                    let ls = this.calendarData[index];
                    this.calendarData[index] = []
                    for(let j in ls)if(ls[j]['course'])this.calendarData[index].push(ls[j])
                }
            },

            handleSelect(key, keyPath) {
                let road = key.split('-')
                let act = this.action_tree;
                for(const i in road)act = act[road[i]]
                if(act === 'ChangeInfo') this.$storage.saveSessionObject('role', 1);
                console.log(act)
                this.$router.push({name: act})
            },

            init_info() {
                this.info = this.$storage.getUserInfo();
                if(this.info) {
                    this.init_info_table();
                    return
                }
                request({
                    uri: this.$storage.address() + 'info/teacher/' + this.user.user_id,
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
                    key: '职称',
                    val: this.info.title
                }, {
                    key: '--',
                    val: '----'
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

            _draw() {
                let index = this.$storage.getSessionObject('GeoIndex')
                let chart = echarts.init(document.getElementById('CPLchart'))
                const option = {
                    title: {
                        text: '地理定位',
                        subtext: '数据来源：ip-api',
                        left: 'left',
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#132937',
                                borderColor: '#0692a4'
                            },
                            emphasis: {
                                areaColor: '#0b1c2d'
                            }
                        }
                    },
                    series: {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        itemStyle: {normal: {color: '#a6c84c'}},
                        data: [{
                            name: index.regionName,
                            value: [index.lon, index.lat, 100]
                        }]
                    }
                };
                chart.setOption(option);
            },

            drawCharts() {
                if(this.$storage.getSessionObject('GeoIndex') === null)request({
                    uri: 'http://ip-api.com/json',
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.$storage.saveSessionObject('GeoIndex', res)
                    this._draw();
                }).catch(error => {this.$message.error(error)});
                else this._draw();
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