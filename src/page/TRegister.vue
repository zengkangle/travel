<template>
<div id="reg">
    <el-card id="ecard">
        <el-form id="eform" :model="regUser" :rules="rules" ref="regForm" label-width="100px">
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9090/files/upload"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :limit="1">
                    <img v-if="regUser.avatarUrl" :src="regUser.avatarUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称" prop="userName" for="userName">
                <el-input id="userName" v-model="regUser.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" for="phone" >
                <el-input id="phone" v-model="regUser.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" for="password" >
                <el-input id="password" type="password" v-model="regUser.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" for="checkPass">
                <el-input id="checkPass" type="password" v-model="regUser.checkPass" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div id="buttons">
            <el-button type="primary" @click="regester">注册</el-button>
            <el-button @click="resetForm">重置</el-button>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
    name:'TRegester',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.regUser.checkPass !== '') {
                    console.log(value)
                    this.$refs.regForm.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.regUser.password) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                regUser:{
                    avatarUrl: '',
                    userName: '',
                    phone: '',
                    password: '',
                    checkPass: '',
                },
                rules:{
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    userName: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, required: true, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, required: true, trigger: 'blur' }
                    ],

                }
            }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.regUser.avatarUrl= res;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        regester() {
            this.$refs['regForm'].validate((valid) => {
                if(valid){//若表单校验合法，则回调函数中valid参数为true，不合法为false
                    this.request.post(
                        "/user/register",
                        this.regUser
                    ).then(res => {
                        console.log(res)
                        if(res.code === '200'){
                            this.$message.success("注册成功")
                            this.$router.push("/login") 
                        }else
                           this.$message.error(res.msg) 
                    }).catch();
                }
            })
        },
        resetForm() {
            this.$refs['regForm'].resetFields();
        }
    },
    mounted(){
        this.$store.state.headshow = false
    },
    beforeDestroy(){
        this.$store.state.headshow = true
    }
}
</script>

<style>
#reg{
    width: 50%;
    margin: 100px auto;
}
#eform{
    width: 85%;
}
#ecard{
    border-radius: 10px;
    text-align: center;
    margin-left: 100px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>