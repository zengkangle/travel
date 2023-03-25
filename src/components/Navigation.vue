<template>
<div id="nav">
    <router-link v-for="item in naviList" :key="item.code" :to="item.listref" active-class="act" v-show="checkLevel(item.isCheck)" >
        <i class="iconfont" v-html="item.code"></i>
        <span>{{item.title}}</span>
    </router-link>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'Navigation',
    data() {
        return {
            naviList:[
                {title:'',code:'&#xe661;',listref:'#javascript:;'},
                {title:'酒店',code:'&#xe73f;',listref:'/hotel'},
                {title:'旅游',code:'&#xe605;',listref:'/area'},
                {title:'交流区',code:'&#xe600;',listref:'/talk'},
                {title:'用户管理',code:'&#xe601;',listref:'/usermanager',isCheck:true},
                {title:'发布',code:'&#xec09;',listref:'/publish'},
            ]
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        checkLevel(value){
            if(value){
                return this.user.level === 'super' ? true : false
            }
            return true  
        }
    }
}
</script>

<style lang="css" scoped>
#nav{
    display: flex;
    z-index: 100;
    flex-direction: column;
    width:76px;
    height: 100vh;
    border-right:1px solid #DADFE6;
    background-color: white;
    font:16px bolder;
    position: fixed;
    overflow: hidden;
    white-space: nowrap;
    transition:0.5s; 
}
#nav:hover{
    width:164px;
}
a{ 
    display: flex;
    height: 35px;
    margin: 20px 0;
    color: black;
    border-radius: 15px;
}
.act{
    background-color:#0086F6 ;
    color: white;
}
.act i{
    color: white;
}
i{
    margin:auto 30px;
    font: 22px bolder;
    color: #0086F6;
}
span{
    font-size: 16px;
    line-height: 35px;
}
</style>

