<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="选课结果" style="margin-top: 27px" @back="goback"></el-page-header>
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
            <el-table ref="course_list"
                      :data="DropableCourses"
                      tooltip-effect="dark" style="width: 100%">
                <el-table-column label="ID" prop="course_id"></el-table-column>
                <el-table-column label="课程" prop="name"></el-table-column>
                <el-table-column label="学分" sortable column-key="score" prop="score"></el-table-column>
                <el-table-column label="起始周" sortable column-key="start_week" prop="start_week"></el-table-column>
                <el-table-column label="周数" sortable column-key="weeks" prop="weeks"></el-table-column>
                <el-table-column label="时间" prop="time_ls"></el-table-column>
                <el-table-column label="地点" prop="loc_ls"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
    </el-container>
</template>

<script>
import request from "request-promise";

export default {
    data() {
        return {
            DropableCourses: []
        }
    },
    created() {
        this.init_course_ls()
    },
    methods: {
        goback() {
            this.$storage.saveSessionObject('DropableCourse', null);
            this.$router.push({name: 'student-dashboard'});
        },

        headerSelect(key, keyPath){
            if(key === "1")console.log(key)
            else console.log(key)
        },

        init_course_ls(depth = 0) {
            if(depth > 5){
                this.$message.error('Max Tried Limited')
                return
            }
            this.DropableCourses = this.$storage.getSessionObject('DropableCourse')
            if(this.DropableCourses === null)request({
                uri: this.$storage.address() + 'course/DropableCourse/' + this.$storage.getBindUser().user_id,
                method: 'GET',
                json: true
            }).then(res => {
                this.$storage.saveSessionObject('DropableCourse', res);
                this.init_course_ls(depth + 1)
            }).catch(error => {this.$message.error(error)});
        },

        handleDelete(index, row) {
            request({
                uri: this.$storage.address() + 'course/DropCourse/' + this.$storage.getBindUser().user_id + '?cid=' + row.course_id,
                method: 'GET',
                json: true
            }).then(res => {
                this.DropableCourses.splice(index, 1);
                this.$message({
                    message: res.status?'退课成功': '退课失败',
                    type: res.status?'success': 'error'
                })
            }).catch(error => {this.$message.error(error)});
        }
    }
}
</script>
<style></style>