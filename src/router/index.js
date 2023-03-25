//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";

//引入组件
import THotel from '../page/THotel'
import TTalk from '../page/TTalk'
import TRegister from '../page/TRegister'
import Order from '../page/Order'
import TLogin from '../page/TLogin'
import TPerson from '../page/TPerson'
import TalkDetail from '../page/TalkDetail'
import UserManager from '../page/UserManager'
import TArea from '../page/TArea'
import TPublish from '../page/TPublish'
import MyOrder from '../page/MyOrder' 
import SearchResult from '../page/SearchResult' 
//创建一个路由器
const router = new VueRouter({
    routes:[
        //默认跳转
        {
            path:'/',
            redirect:'/talk'
        },
        {
            path:'/talk',
            component:TTalk,
            meta:{title:'交流区'}
        },
        {
            name:'talkdetail',
            path:'/talkdetail/:itemmsg',
            component:TalkDetail,
            meta:{title:'用户评论'},
            props:true
        },
        {
            path:'/hotel',
            component:THotel,
            meta:{title:'酒店'}
        },
        {
            path:'/area',
            component:TArea,
            meta:{title:'旅游'}
        },
        {
            name:'order',
            path:'/order/:msg/:flag',
            component:Order,
            props:true,
            meta:{title:'预定'}
        },
        {
            path:'/register',
            component:TRegister,
            meta:{title:'注册用户'},
        },
        {
            path:'/login',
            component:TLogin,
            meta:{title:'用户登录'}
        },
        {
            path:'/person',
            component:TPerson,
            meta:{title:'个人信息'}
        },
        {
            path:'/myorder',
            component:MyOrder,
            meta:{title:'我的订单'}
        },
        {
            path:'/usermanager',
            component:UserManager,
            meta:{title:'用户管理'}
        },
        {
            path:'/publish',
            component:TPublish,
            meta:{title:'信息发布区'}
        },
        {
            name:'SearchResult',
            path:'/searchresult/:keyword',
            component:SearchResult,
            props:true,
            meta:{title:'搜索结果'}
        },
    ]
    })

    
// 添加如下代码可以防止重复点击一个路径是浏览器报路径重复的错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
//暴露路由器
export default router;

//全局后置路由守卫——初始化的时候被调用，每次路由切换之后被调用
router.afterEach((to,from)=>{
    document.title = to.meta.title
})