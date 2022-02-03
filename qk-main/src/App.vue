<template>
  <div id="app">
    <template v-if="inFrame">
      <layout />
    </template>
    <template v-else>
      <router-view id="main" v-show="!isChild" />
      <div id="child" v-show="isChild"></div>
    </template>
  </div>
</template>

<script>
import layout from './components/layout'
export default {
  components: { layout },
  computed: {
    //是否在框架显示
    inFrame() {
      return !this.$route.meta || this.$route.meta.inFrame !== false
    },
    //是否子应用
    isChild() {
      return this.$route.meta && this.$route.meta.isChild
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  max-height: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei', '微软雅黑', 'MicrosoftJhengHei', 'STHeiti', 'MingLiu';
}
body {
  color: #303133;
}
#app,#child {
  height: 100%;
}
</style>
