<template>
  <div id="app">
    <el-container>
      <el-header>
        <nav-menu></nav-menu>
      </el-header>
      <el-container class="main-container">
        <el-aside>
          <library></library>
        </el-aside>
        <el-main>
          <clips></clips>
          <config></config>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Clips from '@/components/Clips.vue';
import Config from '@/components/Config.vue';
import Library from '@/components/Library.vue';
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'App',
  components: {
    Clips,
    Config,
    Library,
    NavMenu
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header {
  padding: 0 !important;
  border-bottom: 1px solid #d7dae2;
}
.main-container {
  padding: 40px;
}
.el-aside {
  border: 1px solid #d7dae2;
  border-radius: 4px;
  padding: 20px;
}
.library {
  overflow: auto;
  height: calc(100vh - 180px);
}
.el-main {
  padding: 0 0 0 20px;
}
.clips {
  height: 295px;
  margin-bottom: 20px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
  padding: 20px;
}
.config {
  height: calc(100vh - 535px);
  border: 1px solid #d7dae2;
  border-radius: 4px;
  padding: 20px;
}
</style>
