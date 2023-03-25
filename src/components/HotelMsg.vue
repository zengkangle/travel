<template>
<div id="hlist">
    <router-link id="imgf" :to="toOrder">
        <img :src="itemmsg.imgUrl" alt="">      
    </router-link>

    <div id="middle">
        <router-link id="title" :to="toOrder">
            <span>{{itemmsg.title}}</span>
            <el-rate v-model="itemmsg.grade"
                     :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                     :disabled="true">
            </el-rate>
        </router-link>
        <router-link :to="toOrder">
            {{itemmsg.describes}}    
        </router-link>
    </div>

    <div id="bottom">
        <div id="marksum">
            <span id="mark">{{markmsg}}</span>
            <el-tag id="tag"
                    color="#4978CE"
                    effect="dark">
                {{itemmsg.mark}}
            </el-tag>
        </div>
        <div id="pricesum">
            <span id="price">￥{{itemmsg.price}}</span><span>起</span>
        </div>
        <div id="buttons">
            <el-button v-if="user.level === 'super' " @click="delconfirm(itemmsg.id)" type="danger">删除</el-button>
            <el-button @click="go" id="butn" type="primary">预定</el-button> 
        </div>  
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'HotelMsg',
    data() {
      return {
        toOrder:{
            name:'order',
            params:{
                msg:this.itemmsg,
                flag:this.flag
            }
        }
      }
    },
    props:['itemmsg','flag'],
    computed:{
        markmsg(){
            if(this.itemmsg.mark>4.9)
                return '超级棒'
            else if(this.itemmsg.mark>4.5)
                return '很好'
            else
                return '好'
        },
        ...mapState(['user'])
    },
    methods:{
        del(){
            if (this.flag === 'THotel'){
                this.request.get(
                    '/manager/hotelManager/delHotel/' + this.itemmsg.id
                ).then(res => {
                    this.$emit('update')
                })
            }else{
                 this.request.get(
                    '/manager/areaManager/delArea/' + this.itemmsg.id
                ).then(res => {
                    this.$emit('update')
                })
            }
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

        go(){
            this.$router.push(this.toOrder)
        }
    }
    
}
</script>

<style lang="css" scoped>
#hlist{
    width: 800px;
    display: flex;
    margin: 5px; 
    transition:0.3s;
}
#hlist:hover{
    transform: translateY(-4px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
}
#middle{
    width: 320px;
    border-right: 1px solid #DADFE6;
}
#imgf{
    width: 192px;
    height: 172px;
    transform-style:preserve-3d;
    perspective:8000px;
    overflow:hidden;
    border-radius: 5px;
    margin-right: 10px;
}
img:hover{
    transform: translateZ(300px);
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
#tag{
    width: 40px;
    border-color: #4978CE;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
}
#mark{
    color: #4A77CE;
    font-weight: 550;
    font-size: 16px;
    margin-right: 10px;
}
#bottom{
    width: 304px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
#butn{
    width: 106px;
    background-color: #287DFA;
    margin-top: 22px;
}
#pricesum{
    margin-top: 45px;
}
#price{
    color: #287DFA;
    font-size: 23px;
    font-weight: bolder;
}


</style>