<template>
  <div id="search">
    <input type="text" v-model="keyword" placeholder="搜索任何旅游相关"/>
    <el-button @click="search"  type="primary" size="mini"><i class="iconfont">&#xe63f;</i></el-button>
  </div>
</template>

<script>
export default {
    name:'TSearch',
    data() {
        return {
            keyword:''
        }
    },
    methods:{
        search(){
            console.log('asdasdasd')
            if (this.keyword.trim()!=''){
                this.$router.push({
                    name:'SearchResult',
                    params:{
                        keyword:this.keyword
                    }
                })
            }
        }
    }
}
</script>

<style lang="css" scoped>

#search{
    display: flex;
    margin: auto;
}
input{
    width: 263px;
    border-width: 1px 0 1px 1px;
    border-color: #9ACEFB;
    border-style: solid;
    border-radius: 10px 0 0 10px;
    height: 38px;   
}
input:focus{
    outline:none;
}
button{
    border-radius: 0 5px 5px 0;
    border-color: #0086F6;
    background-color: #0086F6;
}
button:focus,button:active,button:hover{
    border-color: #0086F6;
    background-color: #0086F6;
}
#search a:active,#search a:visited{
    border-width: 1px 0 1px 1px;
    border-color: #9ACEFB;
}
i{
    font-weight: bolder;
    color: white;
    font-size: 20px;
}
</style>