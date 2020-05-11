<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="特殊选课" style="margin-top: 27px" @back="goback"></el-page-header>
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
                <el-form-item label="课程号">
                    <el-input-number v-model="course_id" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item class="center">
                    <el-button type="primary" @click="submit_request">申请</el-button>
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
                course_id: 1,
            }
        },
        methods: {
            goback() {
                this.$router.push({name: 'student-dashboard'});
            },

            headerSelect(key, keyPath){
                if(key === "1")console.log(key)
                else console.log(key)
            },

            submit_request() {
                console.log(this.course_id);
                request({
                    uri: this.$storage.address() + 'course/SelectCourse',
                    method: 'POST',
                    json: {
                        user_id: this.$storage.getBindUser().user_id,
                        course_ls: [this.course_id],
                        force: true
                    }
                }).then(res => {
                    this.$message({
                        message: res.status?'申请已提交': res.msg,
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
</style>