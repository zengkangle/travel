<template>
<div id="header">
    <TSearch/>
    <TUser/>
</div>
</template>

<script>
import TUser from './TUser'
import TSearch from './TSearch'

export default {
    name:'THeader',
    components:{
        TUser,
        TSearch
    }
}
</script>

<style lang="css" scoped>
#header{
    position: relative;
    display: flex;
    height: 70px;
    align-content: center;
}
</style>

