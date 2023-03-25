<template>
<div>
    <el-divider content-position="left">酒店订单</el-divider>
    <el-table :data="hotelOrder" border style="margin-bottom:100px;">
        <el-table-column
            prop="id"
            label="订单号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="hotelTitle"
            label="酒店"
            width="180">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型">
        </el-table-column>
        <el-table-column
            prop="orderStartDate"
            label="开始时间">
            <template slot-scope="scope">
                {{scope.row.orderStartDate | showDate}}
            </template>
        </el-table-column>
        <el-table-column
            prop="orderEndDate"
            label="结束时间">
            <template slot-scope="scope">
                {{scope.row.orderEndDate | showDate}}
            </template>
        </el-table-column>
    </el-table>



    <el-divider content-position="left" >门票订单</el-divider>
    <el-table :data="areaOrder" border>
        <el-table-column
            prop="id"
            label="订单号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="areaTitle"
            label="景区"
            width="180">
        </el-table-column>
        <el-table-column
            prop="num"
            label="票数">
        </el-table-column>
        <el-table-column
            prop="orderDatetime"
            label="预定时间">
            <template slot-scope="scope">
                {{scope.row.orderDatetime | showDatetime}}
            </template>
        </el-table-column>
    </el-table> 
</div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
    name:'MyOrder',
    data() {
        return {
            hotelOrder:[],
            areaOrder:[]
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        gerHotelOrder(){
            this.request.get(
                '/order/gerHotelOrder/' + this.user.id
            ).then(res =>{
                this.hotelOrder = res.data
            })
        },
        getAreaOrder(){
            this.request.get(
                '/order/gerAreaOrder/' + this.user.id
            ).then(res =>{
                console.log(res.data)
                this.areaOrder = res.data
            })
        },
    },
    filters:{
        showDate(value){
            return dayjs(value).format("YYYY-MM-DD")
        },
        showDatetime(value){
            return dayjs(value).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    mounted(){
        this.gerHotelOrder()
        this.getAreaOrder()
    }
}
</script>

<style>

</style>