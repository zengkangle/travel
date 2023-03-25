<template>
<div id="thotel">
    <div>
        <HotelMsg v-for="item in areaMsg" :key="item.id" :itemmsg='item' :flag='flag' @update="getAreaMsg"/>
    </div>
    <TCarousel />
</div>

</template>

<script>
import HotelMsg from '../components/HotelMsg'
import TCarousel from '../components/TCarousel'
export default {
    name:'TArea',
    data() {
        return {
            areaMsg:[],
            flag: 'TArea'                
        }
    },
    methods:{
        getAreaMsg(){
            this.request.get(
                "/area/getAreaMsg"
            ).then(res => {
                this.areaMsg = res.data
                console.log(res.data)
            })
        },
    },
    components:{
        HotelMsg,
        TCarousel
    },
    mounted(){
        this.getAreaMsg()
    }
}
</script>

<style lang="css" scoped>
#thotel{
    display: flex;
}
</style>