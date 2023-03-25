import Vue from 'vue'
import App from './App.vue'

//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'

//引入store
import store from './store'

//引入字体图标
import './assets/icon/iconfont.js'
import './assets/icon/iconfont.css'

//引入包装好的request
import request from './utils/request'

//引入日期处理day.js
import dayjs from 'dayjs'

//按需引入ElementUI组件
import {Rate,Tag,Button,Loading,Avatar,Carousel, CarouselItem,MessageBox,Message,Form,FormItem,Input,Select,Option,Card,Upload,Dropdown,DropdownMenu, DropdownItem,Image,Divider,Dialog,Table,TableColumn,Switch,DatePicker,InputNumber} from 'element-ui'

//关闭生产提醒
Vue.config.productionTip = false

//应用插件
Vue.use(VueRouter)
Vue.use(dayjs)

//全局组件
Vue.component('el-rate',Rate);
Vue.component('el-tag',Tag);
Vue.component('el-button',Button);
Vue.component('el-avatar',Avatar);
Vue.component('el-carousel',Carousel);
Vue.component('el-carousel-item',CarouselItem);
Vue.component('el-form',Form);
Vue.component('el-form-item',FormItem);
Vue.component('el-input',Input);
Vue.component('el-select',Select);
Vue.component('el-option',Option);
Vue.component('el-card',Card);
Vue.component('el-upload',Upload);
Vue.component('el-dropdown',Dropdown);
Vue.component('el-dropdown-menu',DropdownMenu);
Vue.component('el-dropdown-item',DropdownItem);
Vue.component('el-image',Image);
Vue.component('el-divider',Divider);
Vue.component('el-dialog',Dialog);
Vue.component('el-table',Table);
Vue.component('el-table-column',TableColumn);
Vue.component('el-switch',Switch);
Vue.component('el-date-picker',DatePicker);
Vue.component('el-input-number',InputNumber);

Vue.prototype.$confirm=MessageBox.confirm;
Vue.prototype.$prompt=MessageBox.prompt;
Vue.prototype.$message=Message;
Vue.prototype.request = request;
//全局指令
Vue.directive('loading',Loading);


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
