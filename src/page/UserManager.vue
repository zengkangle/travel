<template>
<div>
    <el-table
        :data="userMsg"
        border
        >
        <el-table-column
            prop="phone"
            label="账号/手机号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="昵称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            prop="address"
            label="住址">
        </el-table-column>
        <el-table-column
            prop="level"
            label="用户级别">
            <template slot-scope="scope">
                {{scope.row.level | showLevel}}
            </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="用户状态">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.status"
                    active-value="on"
                    inactive-value="off"
                    :disabled="scope.row.level === 'super'"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @click.native="changeStatus(scope.row)" >
                </el-switch>
                {{scope.row.status | showStatus}}
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    name:'UserManager',
    data() {
        return {
            userMsg: []
        }
    },
    computed:{
        showUserMsg(){
            this.userMsg.filter
        }
    },
    methods:{
        getuserMsg(){
            this.request.get(
                "/manager/userManager"
            ).then( res => {
                this.userMsg = res.data
            })
        },
        changeStatus(value){
            console.log(value)
            this.request.get(
                "/manager/changeStatus/" + value.id + '/' + value.status
            )
        }
    },
    filters:{
        showLevel(value){
            return value === 'medium' ? '注册用户' : '超级管理员'
        },
        showStatus(value){
            return value === 'on' ? '正常' : '封号'
        }
    },
    mounted(){
        this.getuserMsg()
    }
}
</script>

<style>

</style>