<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="课程管理" style="margin-top: 27px" @back="goback"></el-page-header>
            </el-col>
            <el-col :span="8" style="width: 80%">
                <el-menu class="el-menu-demo" mode="horizontal" @select="headerSelect" style="float: right">
                    <el-submenu index="1">
                        <template slot="title"><el-badge :value="12" :max="9" style="margin-top: 10px;">消息</el-badge></template>
                        <el-menu-item>待开发</el-menu-item>
                    </el-submenu>
                    <el-submenu index=2>
                        <template slot="title"><el-badge :value="3" :max="9" style="margin-top: 10px;">代办事项</el-badge></template>
                        <el-menu-item>待开发</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-header>
        <el-main class="layout" style="-webkit-app-region: no-drag; width: 100%">
            <el-row>
            <el-form>
                <el-form-item label="课程" class="center">
                    <el-select v-model="course_id" placeholder="选择课程" @change="selectCourseId(0)">
                        <el-option v-for="item in course_ls" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{item.label}}</span>
                            <spin style="float: right; color: #8492a6; font-size: 13px">{{item.value}}</spin>
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="CloseClass">结课</el-button>
                </el-form-item>
            </el-form>
            </el-row>
            <el-row>
                <el-table
                        :data = "student_ls_bind_course"
                        tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="学生ID" prop="user_id" sortable column-key="user_id"></el-table-column>
                    <el-table-column label="姓名" prop="name"></el-table-column>
                    <el-table-column label="性别" prop="gender"></el-table-column>
                    <el-table-column label="学院" prop="college"></el-table-column>
                    <el-table-column label="专业" prop="profession"></el-table-column>
                    <el-table-column label="年级" prop="grade"></el-table-column>
                </el-table>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import request from 'request-promise'
    export default {
        data() {
            return {
                course_id: '',
                course_ls: [],
                student_ls_bind_course: []
            }
        },
        created() {
            this.init_course_ls();
        },
        methods: {
            goback() {
                this.$router.push({name: 'teacher-dashboard'});
            },

            headerSelect(key, keyPath){
                if(key === "1")console.log(key)
                else console.log(key)
            },

            init_course_ls(depth = 0) {
                if(depth > 5){
                    this.$message.error('Max Tried Limited!')
                    return
                }
                let cls = this.$storage.getSessionObject('TeacherCourseLs')
                if(cls === null) {
                    request({
                        uri: this.$storage.address() + 'course/Teacher/AllCourseIdName/' + this.$storage.getBindUser().user_id,
                        method: 'GET',
                        json: true
                    }).then(res => {
                        if(res.hasOwnProperty('status')) this.$message.error("No Active Courses~")
                        else{
                            this.$storage.saveSessionObject('TeacherCourseLs', res)
                            this.init_course_ls(depth + 1)
                        }
                    }).catch(error => {
                        this.$message.error(error)
                    })
                } else {
                    this.course_ls = []
                    for (let i in cls) this.course_ls.push({value: i.toString(), label: cls[i]})
                }
            },

            selectCourseId(depth=0) {
                if(depth > 5) {
                    this.$message.error('Max Tried Limited')
                    return
                }
                let cls = this.$storage.getSessionObject(this.course_id.toString() + '_allstu');
                if(cls === null) {
                    request({
                        uri: this.$storage.address() + 'info/AllStudentByCourse/' + this.course_id,
                        method: 'GET',
                        json: true
                    }).then(res => {
                        if (res.hasOwnProperty('status')){
                            this.$message.error('课程已无活跃学生')
                            this.student_ls_bind_course = []
                        }
                        else {
                            this.$storage.saveSessionObject(this.course_id.toString() + '_allstu', res)
                            this.selectCourseId(depth + 1)
                        }
                    }).catch(error => {
                        this.$message.error(error)
                    })
                } else {
                    this.student_ls_bind_course = []
                    for (let i in cls){
                        cls[i]['gender'] = cls[i]['gender']?'男': '女'
                        this.student_ls_bind_course.push(cls[i])
                    }
                }
            },

            CloseClass() {
                request({
                    uri: this.$storage.address() + 'course/CloseClass/' + this.$storage.getBindUser().user_id + '?course_id=' + this.course_id,
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.$message({
                        message: res.status?'结课成功': '结课失败',
                        type: res.status?'success': 'error'
                    })
                }).catch(error => {this.$message.error(error)})
            }
        }
    }
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
</style>