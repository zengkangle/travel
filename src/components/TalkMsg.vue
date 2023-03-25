<template>
<div id="arealist">
    <router-link :to="{name:'talkdetail',params:{itemmsg} }"><img :src="itemmsg.img_url" alt=""></router-link>
    <div>
        <router-link id="title" :to="{name:'talkdetail',params:{itemmsg} }">{{itemmsg.title}}</router-link>
        <div id="user">
            <el-avatar :size="30" :src="itemmsg.avatar_url" ></el-avatar>
            <span>{{itemmsg.user_name}}</span>
        </div>
        <span style="color:#999999">{{itemmsg.describe}}</span>
    </div>
    <div v-if="user.level === 'super' "><el-button id="delbutn" @click="delconfirm()" type="danger">删除</el-button></div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'TalkMsg',
    data() {
        return {

        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        del(){
            this.request.get(
                "manager/talkManager/delTalk/" + this.itemmsg.id
            ).then(res => {
                if(res.code === '200'){
                    this.$emit('update')
                }
            })
        },
        delconfirm(){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.del()                   
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });          
            })
        },
    },
    props:['itemmsg']
}
</script>

<style lang="css" scoped>
#arealist{
    display: flex;
    transition:0.3s;
    margin: 5px;
    position: relative;
}
#arealist:hover{
    transform: translateY(-4px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
}
img{    
    border-radius: 5px;
    margin-right: 10px;
}
a{
    display: block;
    color: black;
}
#title{
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
}
#user{
    display: flex;
    margin: 10px 0;
    cursor: pointer;
}
#user span{
    margin: auto 4px; 
}
#delbutn{
    position:absolute;
    right: 10px;
    bottom: 10px;
}
</style>