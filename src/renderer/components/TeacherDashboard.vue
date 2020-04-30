<template>
    <el-container style="height: 980px; -webkit-app-region: drag">
        <el-header style="font-size: 12px; -webkit-app-region: drag">
            <el-row>
                <el-col :span="8" style="width: 20%">
                    <el-page-header content="教师主页" style="margin-top: 16px" @back="goback"></el-page-header>
                </el-col>
                <el-col :span="8" style="width: 75%">
                    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" style="float: right">
                        <el-submenu index="1">
                            <template slot="title"><el-badge :value="12" :max="9">评论</el-badge></template>
                            <el-menu-item>1212</el-menu-item>
                        </el-submenu>
                        <el-submenu index=2>
                            <template slot="title"><el-badge :value="3" :max="9">回复</el-badge></template>
                            <el-menu-item>33</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col>
                    <el-icon-arrow-down></el-icon-arrow-down>
                </el-col>
            </el-row>
        </el-header>
        <el-container style="height: 100%">
            <el-aside width="240px" style="background-color: rgb(238, 241, 246); -webkit-app-region: no-drag">
                <el-menu class="el-menu-vertical-demo" @select="handleSelect">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main height="100%">
                <el-row style="-webkit-app-region: no-drag" :gutter="10">
                    <el-col :span="8" style="width: 50%">
                        <el-card shadow="hover">
                            <p>账户：{{info.user_id}}</p>
                            <p>姓名：{{info.name}}</p>
                            <p>性别：{{info.gender}}</p>
                            <p>学院：{{info.college}}</p>
                            <p>专业：{{info.profession}}</p>
                        </el-card>
                    </el-col>
                    <el-col :span="8" style="width: 50%">
                        <el-card shadow="hover">
                            方案选修完成情况；
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import request from 'request-promise'
export default {
    data() {
        return {
            info: ''
        }
    },
    mounted() {
        this.init_info();
    },
    created() {
        this.user = this.$storage.getBindUser();
        this.info = this.$storage.getUserInfo();
    },
    methods: {
        goback(){
            this.$router.push({name: 'login-page'})
        },

        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },

        init_info() {
            if(this.info)return
            request({
                uri: this.$storage.address() + 'info/teacher/' + this.user.user_id,
                method: 'GET',
                json: true
            }).then(res => {
                this.info = res;
                this.info.gender = res.gender?'男':'女'
                this.$storage.saveUserInfo(this.info)
            }).catch(err => {
                this.$message.error(err);
            })
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

    .right {
        align-items: right;
        justify-content: right;
    }
</style>
