<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="本学期课表" style="margin-top: 27px" @back="goback"></el-page-header>
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
            <el-table :data="timeData" style="width: 80%;" align="center">
                <el-table-column label="周" fixed="left" prop="label" align="center"></el-table-column>
                <el-table-column label="上午" align="center">
                    <el-table-column
                            v-for="(v, i) in titleData" :key="i"
                            v-if="v.label === '上午'" align="left">
                        <template slot="header" slot-scope="scope">
                            <div class="tabletitle-timeline">第{{v.count}}节<br />{{v.startTime}}-{{v.endTime}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>{{scope.row[courseKey[i]]}}<br />{{scope.row[roomKey[i]]}}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="下午" align="center">
                    <el-table-column
                            v-for="(v, i) in titleData" :key="i"
                            v-if="v.label === '下午'" align="left">
                        <template slot="header" slot-scope="scope">
                            <div class="tabletitle-timeline">第{{v.count}}节<br />{{v.startTime}}-{{v.endTime}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>{{scope.row[courseKey[i]]}}<br />{{scope.row[roomKey[i]]}}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="晚上" align="center">
                    <el-table-column
                            v-for="(v, i) in titleData" :key="i"
                            v-if="v.label === '晚上'" align="left">
                        <template slot="header" slot-scope="scope">
                            <div class="tabletitle-timeline">第{{v.count}}节<br />{{v.startTime}}-{{v.endTime}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>{{scope.row[courseKey[i]]}}<br />{{scope.row[roomKey[i]]}}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </el-container>
    </el-container>
</template>
<script>
    import request from 'request-promise'
    export default {
        data() {
            return {
                fromDate: '',
                toDate: '',
                courseKey:['oneC','twoC','threeC','fourC','fiveC','sixC'],//科目key值
                roomKey: ['oneR','twoR','threeR','fourR','fiveR','sixR'],//老师key值
                week_day_name: '一二三四五六七',
                titleData:[
                    {
                        id:'1',
                        count:1,
                        label:'上午',
                        startTime:'08:00',
                        endTime:'09:50'
                    },
                    {
                        id: '2',
                        count: 2,
                        label: '上午',
                        startTime: '10:05',
                        endTime: '11:50'
                    },
                    {
                        id: '3',
                        count: 3,
                        label: '下午',
                        startTime: '13:30',
                        endTime: '15:15'
                    },
                    {
                        id: '4',
                        count: 4,
                        label: '下午',
                        startTime: '15:30',
                        endTime: '17:15'
                    },
                    {
                        id: '5',
                        count: 5,
                        label: '晚上',
                        startTime: '18:30',
                        endTime: '20:15'
                    },
                    {
                        id: '6',
                        count: 6,
                        label: '晚上',
                        startTime: '20:30',
                        endTime: '22:15'
                    }
                ],
                timeData: []
            }
        },
        mounted() {
            this.init_table()
        },
        created() {
            this.user = this.$storage.getBindUser();
            this.role = this.$storage.getSessionObject('role');
            this.init_date();
        },
        methods: {
            goback(){
                this.$router.push({name: this.role===0?'student-dashboard': 'teacher-dashboard'});
            },

            headerSelect(key, keyPath){
                if(key === "1")console.log(key)
                else console.log(key)
            },

            formatDate(date) {
                const y = date.getFullYear();
                const m = date.getMonth() + 1;
                const d = date.getDate();
                return y + '-' + m + '-' + d;
            },

            init_table(depth) {
                if(depth > 5){
                    this.$message.error('Max Tried Limited!')
                    return
                }
                let ls = this.$storage.getSessionObject('CourseInfos')
                if(ls === null) {
                    request({
                        uri: this.$storage.address() + 'course/' + (this.role===0?'Student':'Teacher') + '/Courses/' + this.$storage.getBindUser().user_id,
                        method: 'GET',
                        json: true
                    }).then(res => {
                        this.$storage.saveSessionObject('CourseInfos', res)
                        this.init_table(depth + 1)
                    }).catch(error => {
                        this.$message.error(error)
                    })
                }
                this.timeData = []
                for(let i=1;i<=7;++i)this.timeData.push({id: i.toString(), label: '周' + this.week_day_name[i-1]})
                for(let i in ls) {
                    let time_ls = ls[i].time_ls.split(' ')
                    let course_name = ls[i].name
                    let loc_ls = ls[i].loc_ls.split(' ')
                    for(let j in time_ls) {
                        time_ls[j] = time_ls[j].split(':')
                        time_ls[j][0] = time_ls[j][0].split(',')
                        time_ls[j][1] = time_ls[j][1].split('-')
                    }
                    let loc_ls_index = 0;
                    for(let week_day in time_ls) {
                        week_day = time_ls[week_day];
                        let days = week_day[0];
                        let cors = week_day[1];
                        for(let day in days)days[day] = parseInt(days[day]);
                        for(let cor in cors)cors[cor] = parseInt(cors[cor]);
                        for(let day in days) {
                            if(cors.length > 1)
                                for(let l = cors[0]; l < cors[1]; ++l) {
                                    if(!this.timeData[days[day] - 1][this.courseKey[l-1]]) {
                                        this.timeData[days[day] - 1][this.courseKey[l - 1]] = '课程：' + course_name;
                                        this.timeData[days[day] - 1][this.roomKey[l - 1]] = '地点：' + loc_ls[loc_ls_index];
                                    } else {
                                        this.timeData[days[day] - 1][this.courseKey[l - 1]] += '、' + course_name;
                                        this.timeData[days[day] - 1][this.roomKey[l - 1]] += '、' + loc_ls[loc_ls_index];
                                    }
                                    loc_ls_index = (loc_ls_index + 1) % loc_ls.length
                                }
                            else {
                                if(!this.timeData[days[day] - 1][this.courseKey[cors[0]-1]]) {
                                    this.timeData[days[day] - 1][this.courseKey[cors[0] - 1]] = '课程：' + course_name;
                                    this.timeData[days[day] - 1][this.roomKey[cors[0] - 1]] = '地点：' + loc_ls[loc_ls_index];
                                } else {
                                    this.timeData[days[day] - 1][this.courseKey[cors[0] - 1]] += '、' + course_name;
                                    this.timeData[days[day] - 1][this.roomKey[cors[0] - 1]] += '、' + loc_ls[loc_ls_index];
                                }
                                loc_ls_index = (loc_ls_index + 1) % loc_ls.length
                            }
                        }
                    }
                }
            },

            init_date() {
                const now = new Date();
                const dayOfWeek = now.getDay();
                this.fromDate = this.formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 1));
                this.toDate = this.formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 7));
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
    .tabletitle-timeline{
        line-height: 18px!important;
    }

    html,body,#app,.el-container{
        padding: 0;
        margin: 0;
        height: 100%;
    }
</style>