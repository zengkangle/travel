<template>
<div id="carousel">
    <el-carousel trigger="click" height="600px" id="ec">
        <el-carousel-item v-for="item in imgs" :key="item.id" >
        <img :src="item.imgUrl" alt="" width="100%" height="100%">
    </el-carousel-item>
</el-carousel>
</div>

</template>

<script>
export default {
    name:'TCarousel',
    data() {
        return {
            imgs:[],
        }
    },
    methods:{
        getCarousel(){
            this.request.get(
                "/carousel/getCarousel"
            ).then(res => {
                this.imgs = res.data
            })
        }
    },
    mounted(){
        this.getCarousel()
    }
}
</script>

<style lang="css" scoped>
#carousel{
    width: 400px;
    height: 600px;
    position: sticky;
    top: 10px;
}
#ec{
    border-radius: 10px;
}
</style>