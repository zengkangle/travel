<template>
<div>


    <el-card class="ecard" v-if="flag === 'THotel'">
        <div class="msg">
            <el-image :src="msg.imgUrl" :preview-src-list="[msg.imgUrl]" id="eimg" style="width:300px">
                <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div class="desc">
                <div class="title">{{msg.title}}</div>
                 <el-rate v-model="msg.grade" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :disabled="true" style="margin-top:5px;"></el-rate>
                 <div style="margin-top:5px;">{{msg.describes}}</div>
            </div>
        </div>
        <el-form id="eform" :model="orderHotelMsg" ref="orderHotelMsg" label-width="70px">
            <el-form-item label="选择房型" prop="type" for="type" >
                <el-select v-model="orderHotelMsg.type" id="type" style="width:100%">
                    <el-option label="商务大床房" value="商务大床房"></el-option>
                    <el-option label="亲子双人床" value="亲子双人床"></el-option>
                    <el-option label="豪华大床房" value="豪华大床房"></el-option>
                    <el-option label="情侣主题双人床" value="情侣主题双人床"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择日期" prop="date" >
                <el-date-picker
                    v-model="DateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div style="text-align:right;">
            <el-button type="primary" @click="confirmOrderHotel" >预定酒店</el-button> 
        </div>  
    </el-card>



    <el-card class="ecard" v-if="flag === 'TArea'">
        <div class="msg">
            <el-image :src="msg.imgUrl" :preview-src-list="[msg.imgUrl]" id="eimg" style="width:300px">
                <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div class="desc">
                <div class="title">{{msg.title}}</div>
                 <el-rate v-model="msg.grade" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :disabled="true" style="margin-top:5px;"></el-rate>
                 <div style="margin-top:5px;">{{msg.describes}}</div>
            </div>
        </div>
        <el-form id="eform" :model="orderAreaMsg" ref="orderAreaMsg" label-width="70px">
            <el-form-item label="购买票数" prop="type" for="type" >
                <el-input-number v-model="orderAreaMsg.num" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="选择日期" prop="datetime" >
                <el-date-picker
                    v-model="orderAreaMsg.orderDatetime"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div style="text-align:right;">
            <el-button type="primary" @click="confirmOrderArea" >预定门票</el-button> 
        </div>  
    </el-card>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'Order',
    data() {
        return {
            DateRange:[],
            orderHotelMsg:{
                type:'',
            },
            orderAreaMsg:{
                num:1,
                orderDatetime:'',
            }
        }
    },
    props:['msg','flag'],
    computed:{
        ...mapState(['user'])
    },
    methods:{
        orderHotel(){
            this.orderHotelMsg.orderStartDate = this.DateRange[0]
            this.orderHotelMsg.orderEndDate = this.DateRange[1]
            this.orderHotelMsg.hotelId = this.msg.id
            this.orderHotelMsg.userId = this.user.id
            this.request.post(
                '/order/orderHotel',
                this.orderHotelMsg
            ).then(res => {
                if (res.code === '200'){
                    this.$message.success('预定成功！')
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        confirmOrderHotel(){
            this.$confirm('您将要预定此酒店, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {                   
                    this.orderHotel()
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });          
            })
        },
        orderArea(){
            this.orderAreaMsg.areaId = this.msg.id
            this.orderAreaMsg.userId = this.user.id
            this.request.post(
                '/order/orderArea',
                this.orderAreaMsg
            ).then(res => {
                if (res.code === '200'){
                    this.$message.success('预定成功！')
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        confirmOrderArea(){
            this.$confirm('您将要预定此门票, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {                   
                    this.orderArea()
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });          
            })            
        },
    },  
}
</script>

<style scoped>
.ecard{
    width: 65%;
    margin: 0 auto;
}
.msg{
    display: flex;
    margin-bottom: 20px;
}
.title{
    font-size: 25px;
    font-weight: bolder;
}
.desc{
    margin-left: 20px;
}
</style>