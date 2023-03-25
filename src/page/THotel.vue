<template>
<div id="thotel">
    <div>
        <HotelMsg v-for="item in hotelMsg" :key="item.id" :itemmsg='item' :flag='flag' @update="getHotelMsg"/>
    </div>
    <TCarousel />
</div>

</template>

<script>
import HotelMsg from '../components/HotelMsg'
import TCarousel from '../components/TCarousel'
export default {
    name:'THotel',
    data() {
        return {
            hotelMsg:[],
            flag:'THotel'                
        }
    },
    methods:{
        getHotelMsg(){
            this.request.get(
                "/hotel/getHotelMsg"
            ).then(res => {
                this.hotelMsg = res.data
                console.log(res.data)
            })
        },
    },
    components:{
        HotelMsg,
        TCarousel
    },
    mounted(){
        this.getHotelMsg()
    }
}
</script>

<style lang="css" scoped>
#thotel{
    display: flex;
}
</style>