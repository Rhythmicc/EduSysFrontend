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
            <el-table :data="timeData" style="width: 80%; margin-top: 10%" align="center">
                <el-table-column label="周" fixed="left" prop="label" align="center"></el-table-column>
                <el-table-column label="上午" align="center">
                    <el-table-column
                            v-for="(v, i) in titleData" :key="i"
                            v-if="v.label === '上午'" align="center">
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
                            v-if="v.label === '下午'" align="center">
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
                            v-if="v.label === '晚上'" align="center">
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
                roomKey:['oneR','twoR','threeR','fourR','fiveR','sixR'],//老师key值
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
                timeData: [
                    {
                        id: '1',
                        label: '周一',
                    },
                    {
                        id: '2',
                        label: '周二',
                        twoC: '计算机网络原理',
                        twoR: '校本部三教212',
                        fourC: '就业指导',
                        fourR: '校本部四教407',
                        fiveC: '单片机',
                        fiveR: 'None'
                    },
                    {
                        id: '3',
                        label: '周三',
                        fourC: '软件工程课程设计',
                        fourR: '校本部三教305'
                    },
                    {
                        id: '4',
                        label: '周四',
                        twoC: '计算机网络原理',
                        twoR: '校本部三教212',
                        threeC: '法语语言文化专题',
                        threeR: '校本部四教310',
                        fiveC: '单片机',
                        fiveR: 'None'
                    },
                    {
                        id: '5',
                        label: '周五',
                        oneC: '就业指导',
                        oneR: '校本部四教407',
                        fourC: '软件工程课程设计',
                        fourR: '校本部三教305'
                    },
                    {
                        id: '6',
                        label: '周六',
                    },
                    {
                        id: '7',
                        label: '周日',
                    }
                ]
            }
        },
        mounted() {

        },
        created() {
            this.user = this.$storage.getBindUser();
            this.role = this.$storage.getRole();
            this.init_date();
        },
        methods: {
            goback(){
                this.$router.go(-1);
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