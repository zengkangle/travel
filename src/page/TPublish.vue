<template>
<div>


    <el-divider content-position="left" v-if="user.level === 'super'">酒店发布</el-divider>
    <el-card class="ecard" v-if="user.level === 'super'">
        <el-form id="eform" :model="hotelForm" ref="hotelForm" label-width="100px">
            <el-form-item label="封面">
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/files/upload"
                    :on-success="handleHotelSuccess"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title" for="hotelTitle" :rules="[{ required: true, message: '标题不能为空'}]">
                <el-input id="hotelTitle" v-model="hotelForm.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describes" for="hotelDescribes" :rules="[{ required: true, message: '描述不能为空'}]">
                <el-input
                    id="hotelDescribes"
                    type="textarea"
                    :autosize="{minRows: 5}"
                    maxlength="50"
                    show-word-limit
                    placeholder="请输入评论"
                    v-model="hotelForm.describes">
                </el-input>
            </el-form-item>
            <el-form-item label="星级" prop="grade" for="hotelGrade" >
                <el-select v-model="hotelForm.grade" id="hotelGrade" style="width:100%">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="起步价格" 
                          prop="price" 
                          for="hotelPrice" 
                          :rules="[
                          { required: true, message: '价格不能为空'},
                          { type: 'number', message: '价格必须为数字值'}]">
                <el-input id="hotelPrice"  v-model.number ="hotelForm.price" ></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="publishHotel">发布酒店信息</el-button>     
    </el-card>


    <el-divider content-position="left" v-if="user.level === 'super'" >旅游发布</el-divider>
    <el-card class="ecard" v-if="user.level === 'super'">
        <el-form id="eform" :model="areaForm" ref="areaForm" label-width="100px">
            <el-form-item label="封面">
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/files/upload"
                    :on-success="handleAreaSuccess"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title" for="areaTitle" :rules="[{ required: true, message: '标题不能为空'}]">
                <el-input id="areaTitle" v-model="areaForm.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describes" for="areaDescribes" :rules="[{ required: true, message: '描述不能为空'}]">
                <el-input
                    id="areaDescribes"
                    type="textarea"
                    :autosize="{minRows: 5}"
                    maxlength="50"
                    show-word-limit
                    placeholder="请输入评论"
                    v-model="areaForm.describes">
                </el-input>
            </el-form-item>
            <el-form-item label="星级" prop="grade" for="areaGrade" >
                <el-select v-model="hotelForm.grade" id="areaGrade" style="width:100%">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5n "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="起步价格" 
                          prop="price" 
                          for="areaPrice" 
                          :rules="[
                          { required: true, message: '价格不能为空'},
                          { type: 'number', message: '价格必须为数字值'}]">
                <el-input id="areaPrice"  v-model.number ="hotelForm.price" ></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="publishArea">发布旅游信息</el-button>     
    </el-card>




    <el-divider content-position="left">帖子发布</el-divider>
    <el-card class="ecard" style="margin-bottom:30px">
        <el-form id="eform" :model="talkForm" ref="talkForm" label-width="100px">
            <el-form-item label="封面">
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/files/upload"
                    :on-success="handleTalkSuccess"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title" for="talkTitle" :rules="[{ required: true, message: '标题不能为空'}]">
                <el-input id="talkTitle" v-model="talkForm.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describes" for="talkDescribes" :rules="[{ required: true, message: '描述不能为空'}]">
                <el-input
                    id="talkDescribes"
                    type="textarea"
                    :autosize="{minRows: 5}"
                    maxlength="50"
                    show-word-limit
                    placeholder="请输入评论"
                    v-model="talkForm.describes">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="publishTalk">发布帖子信息</el-button>
    </el-card>
    <div id="bottom"></div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'TPublish',
    data() {
        return {
            hotelForm:{
                imgUrl: '',
                title: '',
                describes: '',
                grade: 1,
                price:100,
            },
            areaForm:{
                imgUrl: '',
                title: '',
                describes: '',
                grade: 1,
                price:100,
            },
            talkForm:{
                imgUrl: '',
                title: '',
                describes: '',
            }
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        handleHotelSuccess(res){
            this.hotelForm.imgUrl=res;
        },
        handleAreaSuccess(res){
            this.areaForm.imgUrl=res;
        },
        handleTalkSuccess(res){
            this.talkForm.imgUrl=res;
        },
        publishHotel(){
            this.request.post(
                "/manager/hotelManager/insertHotel",
                this.hotelForm
            ).then(res =>{
                if(res.code === '200'){
                    this.$message.success("发布成功！")
                    this.$router.push("/hotel")
                }else{
                    this.$message.error(res.msg)
                }                
            })
        },
        publishArea(){
            this.request.post(
                "/manager/areaManager/insertArea",
                this.areaForm
            ).then(res =>{
                if(res.code === '200'){
                    this.$message.success("发布成功！")
                    this.$router.push("/area")
                }else{
                    this.$message.error(res.msg)
                }                
            })
        },
        publishTalk(){
            this.talkForm.userId = this.user.id
            this.request.post(
                "/manager/talkManager/insertTalk",
                this.talkForm
            ).then(res =>{
                if(res.code === '200'){
                    this.$message.success("发布成功！")
                    this.$router.push("/talk")
                }else{
                    this.$message.error(res.msg)
                }                
            })           
        }
    },
}
</script>

<style scoped>
.ecard{
    width: 80%;
    margin: 10px auto;
    text-align: center;
}
#bottom{
    width: 100px;
    height: 100px;
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
</style>