<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="普通选课" style="margin-top: 27px" @back="goback"></el-page-header>
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
        <el-main style="height: 100%; -webkit-app-region: no-drag">
            <div align="center">
                <el-button @click="submit_selection">提交选课</el-button>
                <el-button @click="clear_all_selection">清除</el-button>
            </div>
            <el-table ref="course_list"
                      :data="course_table"
                      tooltip-effect="dark" style="width: 100%" @selection-change="selection_change">
                <el-table-column type="selection" :selectable="isSelectable" v-model="selection"></el-table-column>
                <el-table-column label="ID" prop="course_id"></el-table-column>
                <el-table-column label="课程" prop="name"></el-table-column>
                <el-table-column label="学分" sortable column-key="score" prop="score"></el-table-column>
                <el-table-column label="起始周" sortable column-key="start_week" prop="start_week"></el-table-column>
                <el-table-column label="周数" sortable column-key="weeks" prop="weeks"></el-table-column>
                <el-table-column label="时间" prop="time_ls"></el-table-column>
                <el-table-column label="地点" prop="loc_ls"></el-table-column>
                <el-table-column label="余量" prop="rest"></el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import request from 'request-promise'
    export default {
        data() {
            return {
                course_table: [],
                selection: [],
                calendar: {},
                select_calendar: []
            }
        },
        created() {
            this.init_calendar()
            this.init_course_table()
        },
        methods: {
            goback() {
                this.$storage.saveSessionObject('calendar', null)
                this.$router.push({name: 'student-dashboard'});
            },

            init_calendar(depth = 0, _force=false) {
                if(depth > 5){
                    this.$message.error('Max Tried Limited!')
                    return
                }
                let cls = this.$storage.getSessionObject('calendar')
                if(cls === null || _force || cls.hasOwnProperty('status'))request({
                    uri: this.$storage.address() + 'info/StudentCalendar/' + this.$storage.getBindUser().user_id,
                    method: 'GET',
                    json: true
                }).then(res => {
                    if(res.hasOwnProperty('status')){
                        if(res.hasOwnProperty('msg')) this.$storage.saveSessionObject('calendar', [])
                        else return this.init_calendar(depth + 1, true);
                    } else this.$storage.saveSessionObject('calendar', res)
                    this.init_calendar(depth + 1)
                }).catch(error => {this.$message.error(error)});
                else {
                    this.calendar = {min_week: 20, max_week: -1, status: []}
                    for(let i=0;i<180*6;++i)this.calendar.status.push(false);
                    for(let i in cls) {
                        let st_week = cls[i]['start_week']-1, end_week = cls[i]['start_week'] + cls[i]['weeks'] - 1;
                        let ls = cls[i]['time_ls'].split(':');
                        this.calendar.min_week = Math.min(this.calendar.min_week, st_week);
                        this.calendar.max_week = Math.max(this.calendar.max_week, end_week);
                        ls[0] = ls[0].split(',')
                        ls[1] = ls[1].split('-')
                        for(let wkd=st_week*7;wkd<end_week*7;++wkd)
                            for(let idx in ls[0]){
                                if(ls[1].length > 1)
                                    for(let j=parseInt(ls[1][0])-1;j<parseInt(ls[1][1]);++j)
                                        this.calendar.status[wkd + parseInt(ls[0][idx]) + j] = true;
                                else this.calendar.status[wkd + parseInt(ls[0][idx]) + parseInt(ls[1][0])] = true;
                            }
                    }
                    this.select_calendar = []
                    for(let i=0;i<180*6;++i)this.select_calendar.push(false);
                }
            },

            init_course_table() {
                this.course_table = this.$storage.getSessionObject('SelectableCourse')
                if(this.course_table === null)request({
                    uri: this.$storage.address() + 'course/SelectableCourse',
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.course_table = res;
                    this.$storage.saveSessionObject('SelectableCourse', res);
                }).catch(error => {this.$message.error(error)});
            },

            isSelectable(row, index) {
                let st_week = row.start_week-1, end_week = row.start_week + row.weeks - 1;
                if(this.calendar.max_week > 0 && st_week > this.calendar.max_week)return true;
                let ls = row.time_ls.split(':');
                ls[0] = ls[0].split(',')
                ls[1] = ls[1].split('-')
                for(let wkd=st_week*7;wkd<end_week*7;++wkd)
                    for(let idx in ls[0]) {
                        if(ls[1].length > 1)
                            for(let j=parseInt(ls[1][0])-1;j<parseInt(ls[1][1]);++j)
                                if(this.calendar.status[wkd + parseInt(ls[0][idx]) + j]
                                    || this.select_calendar[wkd + parseInt(ls[0][idx]) + j]
                                )return false;
                        else if(this.calendar.status[wkd + parseInt(ls[0][idx]) + parseInt(ls[1][0])]
                            || this.select_calendar[wkd + parseInt(ls[0][idx]) + parseInt(ls[1][0])])return false;
                    }
                return true;
            },

            selection_change(val) {
                for(let i in val) {
                    let st_week = val[i]['start_week']-1, end_week = val[i]['start_week'] + val[i]['weeks'] - 1;
                    let ls = val[i]['time_ls'].split(':');
                    ls[0] = ls[0].split(',')
                    ls[1] = ls[1].split('-')
                    for(let wkd=st_week*7;wkd<end_week*7;++wkd)
                        for(let idx in ls[0]){
                            if(ls[1].length > 1)
                                for(let j=parseInt(ls[1][0])-1;j<parseInt(ls[1][1]);++j)
                                    this.select_calendar[wkd + parseInt(ls[0][idx]) + j] = true;
                            else this.select_calendar[wkd + parseInt(ls[0][idx]) + parseInt(ls[1][0])] = true;
                        }
                }
                this.selection = val;
            },

            submit_selection() {
                let post_json = {
                    user_id: this.$storage.getBindUser().user_id,
                    course_ls: []
                }
                for(let i in this.selection)post_json.course_ls.push(this.selection[i].course_id);
                if(!post_json.course_ls.length){
                    this.$message.error('请选择课程')
                    return
                }
                request({
                    uri: this.$storage.address() + 'course/SelectCourse',
                    method: 'POST',
                    json: post_json
                }).then(res => {
                    let false_id = []
                    let cls = this.$storage.getSessionObject('calendar')
                    for(let i in this.selection) {
                        if(!res[this.selection[i].course_id]){
                            false_id.push(this.selection[i].name);
                            continue;
                        }
                        cls.push({
                            'start_week': this.selection[i].start_week,
                            'weeks': this.selection[i].weeks,
                            'time_ls': this.selection[i].time_ls
                        })
                    }
                    this.$storage.saveSessionObject('calendar', cls);
                    if(false_id.length > 0) this.$message.error('失败课程:' + false_id.toString())
                    else this.$message({
                        message: '选课成功',
                        type: 'success'
                    });
                    this.$router.go(0);
                }).catch(error => {this.$message.error(error)})
            },

            clear_all_selection() {
                this.$refs.course_list.clearSelection();
            },

            headerSelect(key, keyPath){
                if(key === "1")console.log(key)
                else console.log(key)
            }
        }
    }
</script>
<style></style>