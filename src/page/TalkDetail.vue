<template>
<div id="td">
    <el-card id="ecard" >
        <div id="user">
            <el-avatar :size="30" :src="itemmsg.avatar_url" ></el-avatar>
            <div>{{itemmsg.user_name}}</div>
        </div>
        <div id="title">{{itemmsg.title}}</div>
        <el-image :src="itemmsg.img_url" :preview-src-list="[itemmsg.img_url]" id="eimg" style="width:600px">
        <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
        </div>
        </el-image>
        <div style="color:#999999">{{itemmsg.describe}}</div>
    </el-card>
    <div id="content">
        <el-input
            type="textarea"
            :autosize="{minRows: 5}"
            placeholder="请输入评论"
            v-model="comment.content"
            >
        </el-input>
        <el-button type="primary" style="margin-left: auto; margin-top:5px" @click="submit">评论</el-button>
    </div>
    <el-divider content-position="left">评论区</el-divider>
    <div v-for="parentComment in comments" :key="parentComment.id" id="comment">
 
            <div id="parUser">
                <el-avatar :size="50" :src="parentComment.user.avatarUrl"></el-avatar>
                <div id="perUserMsg">
                    <span>{{parentComment.user.userName}}</span>
                    <span>:{{parentComment.content}}</span>
                    <div style="margin-top:5px;">
                        {{parentComment.currentTime | timeFormater}}
                        <el-button type="text" @click="beforeReply(parentComment)">回复</el-button>

                        <div id="child">
                            <div v-for="childComment in parentComment.childComments" :key="childComment.id" id="childUser">
                                <div id="childMsg">
                                    <el-avatar :size="30" :src="childComment.user.avatarUrl" ></el-avatar>
                                    <span style="margin:auto 0 auto 5px; cursor: pointer;" @click="beforeReplyTarget(childComment)">{{childComment.user.userName}}</span>
                                    <span v-if="childComment.target" style="margin:auto 0 auto 5px;">回复@{{childComment.target.userName}}</span>
                                    <span style="margin:auto 0 auto 5px">:{{childComment.content}}</span>
                                </div>
                                <div style="margin-top:5px;">{{parentComment.currentTime | timeFormater}}</div>
                            </div>
                        </div>

                    </div>
                </div>           
            </div>



    </div>




    <el-dialog title="回复" :visible.sync="dialogFormVisible">
        <el-form :model="replyComment" style="width:90%">
            <el-form-item label="内容" label-width="50px">
                <el-input
                    type="textarea"
                    :autosize="{minRows: 5}"
                    placeholder="请输入评论"
                    v-model="replyComment.content">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="reply">回 复</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
    name:'TalkDetail',
    data() {
        return {
            comment:{
                talkId:'',
                content:'',
                userId:'',
            },
            replyComment:{
                content:''
            },
            comments:[
            ],
            dialogFormVisible:false
            
        }
    },
    props:[
        'itemmsg'
    ],
    computed:{
        ...mapState(['user'])
    },
    filters:{
        timeFormater(value){
            return dayjs(value).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    methods:{
        getComments(){
            this.request.get(
                "/comment/getComments/"+this.itemmsg.id
            ).then(res =>{
                console.log(res.data)
                this.comments = res.data
            })
        },
        submit(){
            this.request.post(
                "/comment/saveComment",
                this.comment
            ).then(res =>{
                if (res.code === '200'){
                    this.$message.success("评论成功")
                    this.getComments()
                    this.comment.content=''
                }
            })
        },
        beforeReply(parentComment){
            this.replyComment.parentId = parentComment.id
            this.dialogFormVisible=true
        },
        beforeReplyTarget(childComment){
            this.replyComment.targetId = childComment.user.id
            this.replyComment.parentId = childComment.parentId
            this.dialogFormVisible=true
        },
        reply(){
            this.request.post(
                "/comment/saveComment",
                this.replyComment
            ).then(res =>{
                if (res.code === '200'){
                    this.$message.success("回复成功")
                    this.getComments()
                    this.replyComment.content=''
                    this.dialogFormVisible = false
                }
            })
        }
    },
    mounted(){
        this.getComments()
        this.comment.userId=this.user.id
        this.comment.talkId = this.itemmsg.id
        this.replyComment.userId=this.user.id
        this.replyComment.talkId = this.itemmsg.id
    }
}
</script>

<style lang="css" scoped>
#ecard{
    width: 70%;
    margin: 0 auto;
}
#eimg{
    width: 500px;
}
#user{
    display: flex;
    cursor: pointer;
}
#user div{
    margin: auto 7px; 
}
#title{
    font-size: 25px;
    font-weight: bolder;
}
#content{
    width: 85%; 
    margin: 10px auto;
    display: flex;
    flex-direction: column;
}
#parUser{
    display: flex;
    margin: 10px ;
}
#perUserMsg{
    margin-left: 10px;
}
#child{
    border-left: 2px solid #DADFE6;
    padding-left: 10px;
}
#comment{
    margin: 10px 0;
}
#childMsg{
    display: flex;
}
</style>
