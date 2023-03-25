<template>
<div id="user" >
    <el-avatar id="uhead" :size="50" :src="avatarUrl"></el-avatar>
    <template v-if='!user.userName'>
        <router-link  class="login" to="/login">登录</router-link>
        <router-link class="login" to="/register" >注册</router-link>
    </template>
    <template v-if='user.userName'>
        <el-dropdown>
            <span class="el-dropdown-link" >
            {{user.userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toPerson" icon="el-icon-plus">修改个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="toMyOrder" icon="el-icon-plus">我的订单</el-dropdown-item>
                <el-dropdown-item @click.native="logout" icon="el-icon-circle-plus">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </template>

</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'TUser',
    data() {
        return {
        }
    },
    computed:{
        avatarUrl(){
            return this.user.avatarUrl ? this.user.avatarUrl : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        },
        ...mapState(['user'])
    },
    methods:{
        toMyOrder(){
            this.$router.push('/myorder')
        },
        toPerson(){
            this.$router.push('/person')
        },
        logout(){
            sessionStorage.removeItem("user")
            this.$store.dispatch("getUserFromSession")
            this.$message.success("退出成功")
            this.$router.push("/")
        }
    },
    mounted() {
        this.$store.dispatch("getUserFromSession")
    },
}
</script>

<style lang="css" scoped>
img{
    width: 60px;
    border-radius: 50%;
}
#user{
    display: flex;
    margin: auto 0;
    height: 60px;
    line-height: 60px;
    position: absolute;
    right: 0px;
}
span{
    margin: 0 10px;
}
.login{
    color: black;
    margin: 0 10px;
}
#uhead{
    margin: auto 0;
}
.el-dropdown-link {
    cursor: pointer;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>