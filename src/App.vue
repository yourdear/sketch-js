<template>
  <div id="app">
    <router-link to="/" style="margin-right: 20px">home</router-link>
    <router-link to="/sketch">sketch</router-link>
    <router-view/>
  </div>
</template>
<script>

export default {
  components: {}
}
</script>
<style lang="less">
html,body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  height: 100vh;
}

</style>
