//该文件用于创建Vuex中最为核心的store

//引入Vue
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

//应用Vuex插件(创建Store实例之前必须先use(Vuex))
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {
    getUserFromSession(context,value){
        context.commit('GETUserFromSession')
    }
}

//准备 mutations——用于操作数据（state）
const mutations = {
    GETUserFromSession(state,value){
        if(JSON.parse(sessionStorage.getItem('user'))){
            state.user = JSON.parse(sessionStorage.getItem('user'))
        }else{
            state.user.avatarUrl='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            state.user.level='low'
            state.user.userName=''
        }
    }
}
//准备state——用于存储数据
const state = {
    user:{
        avatarUrl:'',
        userName:'',
        gender:'',
        email:'',
        address:'',
        phone:'',
        level:''
    },
    headshow:true,
}
//准备getters——用于将state中的数据进行加工
const getters = {}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})