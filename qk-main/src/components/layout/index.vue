<template>
  <el-container class="container">
    <el-header><layout-header /></el-header>
    <el-container>
      <el-aside width="200px"><layout-sidebar /></el-aside>
      <el-main> <layout-content /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from './components/header'
import layoutSidebar from './components/sidebar'
import layoutContent from './components/content'
export default {
  components: { layoutHeader, layoutSidebar, layoutContent }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  /deep/ .el-header {
    padding: 0 !important;
  }

  /deep/ .el-main {
    padding: 2px !important;
  }
}
</style>
