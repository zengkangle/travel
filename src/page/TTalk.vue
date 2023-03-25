<template>
<div v-loading="loading">
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
            loading:true
        }
    },
    components:{
        TalkMsg
    },
    methods:{
        getMsg(){
            this.request.get(
                "/talk/talkMsg",
            ).then(res => {
                console.log(res.data)
                this.tmsg=res.data
            })
        }
    },
    mounted(){
        this.getMsg()
    }
}
</script>

<style lang="css" scoped>

</style>