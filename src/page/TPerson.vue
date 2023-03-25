<template>
<div id="per">
    <el-card id="ecard">
        <el-form id="eform" :model="perUser" :rules="rules" ref="perForm" label-width="80px">
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9090/files/upload"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccess"
                    :limit="1">
                    <img v-if="perUser.avatarUrl" :src="perUser.avatarUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称" prop="userName" for="userName">
                <el-input id="userName" v-model="perUser.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" for="phone" >
                <el-input id="phone" v-model="perUser.phone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="性别" for="gender">
                <el-select v-model="perUser.gender" placeholder="请选择" id="gender" style="width:100%">
                    <el-option label="保密" value="保密"></el-option>
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" for="email">
                <el-input id="email" v-model="perUser.email"></el-input>
            </el-form-item>
            <el-form-item label="住址" prop="address" for="address">
                <el-input id="address" v-model="perUser.address"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="save">保存</el-button>

    </el-card>
</div>
</template>

<script>
export default {
    name:'TPerson',
    data() {
        return {
            perUser:{
                avatarUrl:'',
                userName:'',
                gender:'',
                email:'',
                address:''
            },
            rules:{
                userName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                ],
                email:[
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            },
        }
    },
    methods:{
        handleAvatarSuccess(res){
            this.perUser.avatarUrl=res;
        },
        getUser(){
            this.request.get(
                "/user/personMsg/"+JSON.parse(sessionStorage.getItem("user")).phone,
            ).then(res => {
                if(res.code == '200'){
                    this.perUser = res.data
                }else{
                    this.$message.error("获取个人信息失败");
                }
            })
        },
        save(){
            this.request.post(
                "/user/save",
                this.perUser
            ).then(res => {
                if(res.code == '200'){
                    this.$message.success("保存成功")
                    //更新浏览器存储的用户信息
                    res.data.token=JSON.parse(sessionStorage.getItem("user")).token
                    sessionStorage.setItem("user",JSON.stringify(res.data))
                    this.$store.dispatch('getUserFromSession')
                }else{
                    this.$message.error("保存失败");
                }
            })
        }
    },
    mounted(){
        this.getUser()
    }
}
</script>

<style lang="css" scoped>
#per{
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
</style>

