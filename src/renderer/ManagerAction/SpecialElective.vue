<template>
    <el-container style="-webkit-app-region: drag" direction="vertical">
        <el-header style="font-size: 12px; -webkit-app-region: drag; border: 2px;">
            <el-col :span="8" style="width: 20%">
                <el-page-header content="选课审批" style="margin-top: 27px" @back="goback"></el-page-header>
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
                      :data="need_approve"
                      tooltip-effect="dark" style="width: 100%">
                <el-table-column label="课程ID" prop="course_id"></el-table-column>
                <el-table-column label="课程" prop="name"></el-table-column>
                <el-table-column label="学分" sortable column-key="score" prop="score"></el-table-column>
                <el-table-column label="学生" prop="user_id"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
    </el-container>
</template>

<script>
    import request from 'request-promise'
    export default {
        data() {
            return {
                need_approve: []
            }
        },
        created() {
            this.init_need_approve();
        },
        methods: {
            goback() {
                this.$router.push({name: 'manager-dashboard'});
            },

            headerSelect(key, keyPath){
                if(key === "1")console.log(key)
                else console.log(key)
            },

            init_need_approve() {
                let ls = this.$storage.getSessionObject('NeedApproveElective')
                if(ls === null)request({
                    uri: this.$storage.address() + 'course/NeedApproveElective',
                    method: 'GET',
                    json: true
                }).then(res => {
                    if(res.hasOwnProperty('status')){
                        this.$message({
                            message: '无待审批特殊选课',
                            type: 'info'
                        })
                    } else {
                        this.need_approve = res;
                        this.$storage.saveSessionObject('NeedApproveElective', res);
                    }
                }).catch(error => {this.$message.error(error)});
                else this.need_approve = ls;
            },

            handleAgree(index, row) {
                request({
                    uri: this.$storage.address() + 'course/ApproveSelect/' + row.user_id + '?course_id=' + row.course_id + '&approve=true',
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.$message({
                        message: res.status?'审批成功': '审批失败',
                        type: res.status?'success': 'error'
                    })
                    if(res.status) this.need_approve.splice(index, 1);
                }).catch(error => {this.$message.error(error)});
            },

            handleDelete(index, row) {
                request({
                    uri: this.$storage.address() + 'course/ApproveSelect/' + row.user_id + '?course_id=' + row.course_id + '&approve=false',
                    method: 'GET',
                    json: true
                }).then(res => {
                    this.$message({
                        message: res.status?'驳回成功': '驳回失败',
                        type: res.status?'success': 'error'
                    })
                    if(res.status) this.need_approve.splice(index, 1);
                }).catch(error => {this.$message.error(error)});
            }
        }
    }
</script>
<style></style>