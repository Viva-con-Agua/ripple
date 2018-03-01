<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

html, body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  height:100%;
  margin: 0;
  background-color: #fafafa;
  color: #22262b;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
  height:100%;
}

  #content {
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    align-items: stretch;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }
  #content > div {
    flex-grow: 1;
    min-width: 25%;
  }
</style>
