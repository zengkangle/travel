<template>
<div>
    <TalkMsg v-for="item in tmsg" :key="item.id" :itemmsg="item" @update="getMsg" />
</div>
</template>

<script>
import TalkMsg from '../components/TalkMsg'
export default {
    name:'TArea',
    data() {
        return {
            tmsg:[],
        }
    },
    props:['keyword'],
    components:{
        TalkMsg
    },
    methods:{
        getMsg(){        
            this.request.get(
                "/talk/talkMsg/" + this.keyword,
            ).then(res => {
                this.tmsg=res.data
            })
        }
    },
    mounted(){
        this.getMsg()
    },
    watch:{
        keyword(){
           this.getMsg() 
        }
    }

}
</script>

<style lang="css" scoped>

</style>