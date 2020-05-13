<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="成绩发布" style="margin-top: 27px" @back="goback"></el-page-header>
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
        <el-container class="layout" style="-webkit-app-region: no-drag; width: 100%">
            <el-form>
                <el-form-item label="课程">
                    <el-select v-model="course_id" placeholder="选择课程" @change="selectCourseId(0)">
                        <el-option v-for="item in course_ls" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{item.label}}</span>
                            <spin style="float: right; color: #8492a6; font-size: 13px">{{item.value}}</spin>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学号">
                    <el-select v-model="student_id" placeholder="选择学生">
                        <el-option v-for="sid in student_ls_bind_course" :key="sid.value" :label="sid.label" :value="sid.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成绩">
                    <el-input-number v-model="score" :precision="2" :step="0.1" :max="100" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item class="center">
                    <el-button type="primary" @click="SubmitGrade">提交</el-button>
                </el-form-item>
            </el-form>
        </el-container>
    </el-container>
</template>

<script>
    import request from 'request-promise'
    export default {
        data() {
            return {
                course_id: '',
                student_id: '',
                score: 80,
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
                let cls = this.$storage.getSessionObject(this.course_id);
                if(cls === null) {
                    request({
                        uri: this.$storage.address() + 'course/GetStudentsByCourseId/' + this.course_id,
                        method: 'GET',
                        json: true
                    }).then(res => {
                        this.$storage.saveSessionObject(this.course_id, res)
                        this.selectCourseId(depth + 1)
                    }).catch(error => {
                        this.$message.error(error)
                    })
                } else {
                    this.student_ls_bind_course = []
                    for (let i in cls) this.student_ls_bind_course.push({value: cls[i], label: cls[i]})
                }
            },

            SubmitGrade() {
                if(!(this.course_id && this.student_id && this.score))return
                request({
                    uri: this.$storage.address() + 'course/UploadGrade',
                    method: 'POST',
                    json: [{
                        course_id: this.course_id,
                        user_id: this.student_id,
                        score: this.score
                    }]
                }).then(res => {
                    if(res.status)this.$message({
                        message: 'success',
                        type: 'success'
                    });
                    else this.$message.error('failed')
                }).catch(error => {
                    this.$message.error(error)
                })
            }
        },
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