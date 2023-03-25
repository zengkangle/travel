<template>
  <div id="app">
    <Navigation/>
    <div id="tbody">
        <THeader v-show="headshow"/>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import THeader from './components/THeader'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed:{
    ...mapState(['headshow'])
  },
  components: {
    Navigation,
    THeader,
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

#app{
  display: flex;
}
#tbody{
  margin: 0 auto;
  width: 1170px;
  height: 100vh;
}

</style>
