<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="修改信息" style="margin-top: 27px" @back="goback"></el-page-header>
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
        <el-container style="height: 100%;">
            <el-form style="margin: auto; width: 50%">
                <el-form-item label="姓名"><el-input v-model="info.name"></el-input></el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="info.gender">
                        <el-radio label="male">男</el-radio>
                        <el-radio label="female">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="role!=2" label="学院"><el-input v-model="info.college"></el-input></el-form-item>
                <el-form-item v-if="role==0" label="专业"><el-input v-model="info.profession"></el-input></el-form-item>
                <el-form-item v-if="role==1" label="职称"><el-input v-model="info.title"></el-input></el-form-item>
                <el-form-item v-if="role==0" label="入学年份"><el-input-number v-model="info.grade" placeholder="输入年"></el-input-number></el-form-item>
                <div style="text-align: center; align-items: center; align-content: center">
                    <el-button type="primary" @click="submit()">确认修改</el-button>
                    <el-button @click="goback()">取消</el-button>
                </div>
            </el-form>
        </el-container>
    </el-container>
</template>
<script>
import request from 'request-promise'
export default {
    data() {
        return {
            info: '',
            role: '',
        }
    },
    created() {
        this.info = this.$storage.getUserInfo()
        this.info.gender = this.info.gender === '男'?'male': 'female'
        this.role = this.$storage.getSessionObject('role')
    },
    methods: {
        goback() {
            if(this.role === 0)this.$router.push({name: "student-dashboard"})
            else if(this.role === 1)this.$router.push({name: "teacher-dashboard"})
            else this.$router.push({name: "manager-dashboard"})
        },
        headerSelect(key, keyPath){
            console.log(key, keyPath)
        },
        submit() {
            this.info.gender = this.info.gender === 'male'
            request({
                url: this.$storage.address() + '/info/alt' + (this.role === 0?"Student":this.role === 1?"Teacher": "Manager"),
                method: 'POST',
                headers:{
                    'User-Agent': 'Request-Promise'
                },
                json: this.info
            }).then(res => {
                if(res.status){
                    this.$message({
                        message: "成功修改",
                        type: 'success'
                    });
                    this.$storage.saveUserInfo(this.info)
                } else this.$message.error("修改失败！" + res.msg);
            }).catch(err => {
                this.$message.error(err);
            })
        }
    }
}
</script>
<style type="scss" scoped>

</style>