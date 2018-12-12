<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <DocReader />
  </div>
</template>

<script>
import DocReader from './components/DocReader.vue'

export default {
  name: 'app',
  components: {
    DocReader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  /* -- Nuxeo Branding colors -- */
  --nuxeo-primary-color: #ccc;
}
</style>
