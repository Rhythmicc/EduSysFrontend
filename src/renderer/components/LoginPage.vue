<template>
    <el-container class="layout" style="-webkit-app-region: drag">
        <el-header class="center">
            <div style="-webkit-app-region: no-drag">
                <h2 class="title">中国石油大学（北京）教务系统</h2>
                <h3 class="title" style="color: #4394e9">登录</h3>
            </div>
        </el-header>
        <el-divider></el-divider>
        <el-main class="center">
            <el-tabs>
                <el-tab-pane style="-webkit-app-region: no-drag">
                    <el-form :model="formItem" :rules="ruleItem">
                        <template>
                            <el-form-item label="用户" prop="user_id">
                                <el-input v-model="formItem.user_id" placeholder="用户 ID"/>
                            </el-form-item>
                            <br />
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="formItem.password" type="password"/>
                            </el-form-item>
                        </template>
                        <el-form-item>
                            <div class="buttons layout">
                                <el-button type="success" @click="handleSubmit()">登录</el-button>
                                <el-button type="primary" @click="register()" style="margin-left: 8px">注册</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
import request from 'request-promise'
export default {
    name: 'login-page',
    
    data() {
        return {
            login_res : '',
            formItem: {
                user_id: '',
                password: ''
            },
            ruleItem: {
                user_id: [{required: true, message: "用户ID不能为空", trigger: 'blur'}],
                password: [{required: true, message: "密码不能为空", trigger: 'blur'}]
            }
        }
    },
    mounted() {
        let res = this.$storage.getBindUser();
        if(JSON.stringify(res) !== 'null')this.formItem = res;
    },
    methods: {
        handleSubmit() {
            if(!(this.formItem.user_id))return;
            const api = this.$storage.address() + "login/";
            request({
                uri: api + this.formItem.user_id + "?pwd=" + this.formItem.password,
                method: 'GET',
                json: true
            }).then(res => {
                if(res.status){
                    this.$message({
                        message: "登录成功！",
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$storage.saveRole(res.role)
                        if(res.role === 0){
                            this.$storage.saveUser(this.formItem, () => {
                                this.$router.push({
                                    name: 'student-dashboard'
                                }).catch(data => {
                                    this.$message.error(data)
                                })
                            });
                        } else if (res.role === 1){
                            this.$storage.saveUser(this.formItem, () => {
                                this.$router.push({
                                    name: 'teacher-dashboard'
                                }).catch(data => {
                                    this.$message.error(data)
                                })
                            });
                        } else{ 
                            this.$storage.saveUser(this.formItem, () => {
                                this.$router.push({
                                    name: 'manager-dashboard'
                                }).catch(data => {
                                    this.$message.error(data)
                                })
                            });
                    }}, 1000);
                } else this.$message.error("登录失败！");
            })
        },

        register() {
            this.$router.push({
                name: 'register-page',
            }).catch(data => {
                console.log(data)
            })
        }
    }
}
</script>

<style lang="scss" scope>
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