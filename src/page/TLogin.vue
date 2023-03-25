<template>
<div id="log">
    <el-card id="ecard">
        <div id="title">用户登录</div>
        <el-form :model="user" :rules="rules" ref="logForm" label-width="100px" id="lform">
            <el-form-item label="账号" prop="phone" for="pho">
                <el-input v-model="user.phone" placeholder="请输入注册时的手机号" id="pho"  prefix-icon="el-icon-user" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" for="pas">
                <el-input type="password" v-model="user.password"  prefix-icon="el-icon-lock" show-password id="pas"></el-input>
            </el-form-item>
        </el-form>
        <div id="buttons">
            <el-button type="primary" @click="login('regForm')">登录</el-button>
            <el-button @click="goRegister">去注册</el-button>
        </div>
    </el-card>
</div>
</template>

<script>

export default {
    name:'TLogin',
    data() {
        return {
            user:{
                phone:'',
                password:'',
            },
            rules:{
                phone:[
                    { required: true, message:'请输入账号', trigger: 'blur'}
                ],
                password:[
                    { required: true, message:'请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            this.$refs['logForm'].validate((valid) => {
                if(valid){//若表单校验合法，则回调函数中valid参数为true，不合法为false
                    this.request.post(
                        "/user/login",
                        this.user
                    ).then(res => {
                        if(res.code === '200'){
                            this.$message.success("登录成功")
                            sessionStorage.setItem("user",JSON.stringify(res.data))//存储用户信息到浏览器
                            this.$store.dispatch("getUserFromSession")
                            this.$router.push("/") 
                        }else
                           this.$message.error(res.msg) 
                    }).catch();
                }
            })
        },
        goRegister(){
            this.$router.push({
                path:'/register'
            })
        }
    }
}
</script>

<style lang="css" scoped>
#log{
    width: 40%;
    margin: 100px auto;
}
#lform{
    width: 90%;
}
#ecard{
    border-radius: 10px;
    text-align: center;
    margin-left: 50px;
}
#title{
    margin: 20px auto;
    font-weight: bolder;
}
</style>