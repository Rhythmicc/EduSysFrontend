<template>
    <el-container class="layout" style="-webkit-app-region: drag">
        <el-header class="title">
            <h2>中国石油大学（北京）教务系统</h2>
            <h3 color="#5500ff">注册</h3>
        </el-header>
        <el-divider></el-divider>
        <el-main style="-webkit-app-region: no-drag" class="center">
        <el-tabs v-model="role">
            <el-tab-pane label="学生" name="student">
                <el-form ref="studentForm" :model="studentForm">
                    <el-form-item label="账户名（邮箱）"><el-input v-model="studentForm.user_id"></el-input></el-form-item>
                    <el-form-item label="密码"><el-input type="password" v-model="studentForm.pwd"></el-input></el-form-item>
                    <el-form-item label="确认密码"><el-input type="password" v-model="repassword"></el-input></el-form-item>
                    <el-form-item label="姓名"><el-input v-model="studentForm.name"></el-input></el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="studentForm.gender">
                            <el-radio label="male">男</el-radio>
                            <el-radio label="female">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="学院"><el-input v-model="studentForm.college"></el-input></el-form-item>
                    <el-form-item label="专业"><el-input v-model="studentForm.profession"></el-input></el-form-item>
                    <el-form-item label="入学年份"><el-input-number v-model="studentForm.grade" placeholder="输入年"></el-input-number></el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="教师" name="teacher">
                <el-form ref="teacherForm" :model="teacherForm">
                    <el-form-item label="账户名（邮箱）"><el-input v-model="teacherForm.user_id"></el-input></el-form-item>
                    <el-form-item label="密码"><el-input type="password" v-model="teacherForm.pwd"></el-input></el-form-item>
                    <el-form-item label="确认密码"><el-input type="password" v-model="repassword"></el-input></el-form-item>
                    <el-form-item label="姓名"><el-input v-model="teacherForm.name"></el-input></el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="teacherForm.gender">
                            <el-radio label="male">男</el-radio>
                            <el-radio label="female">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="学院"><el-input v-model="teacherForm.college"></el-input></el-form-item>
                    <el-form-item label="职称"><el-input v-model="teacherForm.title"></el-input></el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="管理员" name="manager">
                <el-form ref="managerForm" :model="managerForm">
                    <el-form-item label="账户名（邮箱）"><el-input v-model="managerForm.user_id"></el-input></el-form-item>
                    <el-form-item label="密码"><el-input type="password" v-model="managerForm.pwd"></el-input></el-form-item>
                    <el-form-item label="确认密码"><el-input type="password" v-model="repassword"></el-input></el-form-item>
                    <el-form-item label="姓名"><el-input v-model="managerForm.name"></el-input></el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="managerForm.gender">
                            <el-radio label="male">男</el-radio>
                            <el-radio label="female">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <div class="buttons layout">
                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="goto_login()">返回登录</el-button>
            </div>
        </el-tabs>
        </el-main>
    </el-container>
</template>
<script>
import request from 'request-promise'
export default {
    name: 'register-page',
    data(){
        return {
            role: 'student',
            repassword: '',
            studentForm: {
                user_id: '',
                pwd: '',
                name: '',
                gender: 'male',
                college: '',
                profession: '',
                grade: 2020
            },
            teacherForm: {
                user_id: '',
                pwd: '',
                name: '',
                gender: 'male',
                college: '',
                title: ''
            },
            managerForm: {
                user_id: '',
                pwd: '',
                name: '',
                gender: 'male',
            },
        }
    },
    mounted() {
    },
    methods: {
        checkRePassword(rule, value, callback){
            var fm = this.role === 'student'? this.studentForm : this.role === 'teacher'? this.teacherForm : this.managerForm;
            if(value === '')return callback(new Error('请再次输入密码'));
            else if(value !== fm.pwd)return callback(new Error('两次密码不一致'))
            else callback();
        },
        goto_login(){
            this.$router.push({name: 'login-page'});
        },
        submit() {
            var fm = this.role === 'student'? this.studentForm : this.role === 'teacher'? this.teacherForm : this.managerForm;
            for(var i in fm)if(!fm[i])return
            if(fm.pwd !== this.repassword){
                this.$message.error('确认密码失败！')
                return
            }
            var api = this.$storage.address() + 'register/' + this.role
            request({
                uri: api,
                method: 'POST',
                headers:{
                    'User-Agent': 'Request-Promise'
                },
                json: fm
            }).then(res => {
                if(res.status){
                    this.$message({
                        message: "成功注册",
                        type: 'success'
                    });
                    setTimeout(()=>{
                        goto_login();
                    }, 3000);
                } else this.$message.error("注册失败！" + res.msg);
            }).catch(err => {
                this.$message.error(err);
            })
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
        width: 50%;
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