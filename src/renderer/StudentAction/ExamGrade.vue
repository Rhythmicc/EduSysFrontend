<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="考试成绩" style="margin-top: 27px" @back="goback"></el-page-header>
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
        <el-main style="height: 100%; -webkit-app-region: no-drag;">
            <el-row style="width: 100%;">
                <el-col>
                    <el-table :data="course_ls" align="center">
                        <el-table-column label="ID" prop="course_id"></el-table-column>
                        <el-table-column label="课程" prop="name"></el-table-column>
                        <el-table-column label="学分" prop="score"></el-table-column>
                        <el-table-column label="起始（周）" prop="start_week"></el-table-column>
                        <el-table-column label="周数" prop="weeks"></el-table-column>
                        <el-table-column label="时间" prop="time_ls"></el-table-column>
                        <el-table-column label="地点" prop="loc_ls"></el-table-column>
                        <el-table-column label="成绩" prop="grade"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import request from 'request-promise'
    export default {
        data() {
            return {
                course_ls: []
            }
        },
        created() {
            this.init_course_ls(0);
        },
        methods: {
            goback() {
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
                this.course_ls = this.$storage.getSessionObject('AllStudentGrade')
                if(this.course_ls === null) {
                    request({
                        uri: this.$storage.address() + 'course/GetGradesByStudent/' + this.$storage.getBindUser().user_id,
                        method: 'GET',
                        json: true
                    }).then(res => {
                        this.$storage.saveSessionObject('AllStudentGrade', res)
                        this.init_course_ls(depth + 1)
                    }).catch(error => {
                        this.$message.error(error)
                    })
                }
            }
        }
    }
</script>
<style></style>