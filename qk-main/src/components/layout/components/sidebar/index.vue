<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo" :default-active="active">
      <sidebar-menus :data="menus"></sidebar-menus>
    </el-menu>
  </div>
</template>

<script>
import sidebarMenus from '../menus'
import { mapState } from 'vuex'
export default {
  components: { sidebarMenus },
  computed: {
    ...mapState('app/user', { menus: (s) => s.menus, routes: (s) => s.routes }),
    ...mapState('app/page', ['current']),
    active: {
      get() {
        if (this.current.name && this.routes) {
          const routeMenu = this.routes.find((m) => m.routeName === this.current.name)
          if (routeMenu) {
            return routeMenu.id + ''
          }
        }
        return '-1'
      },
      set() {}
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  height: 100%;

  /deep/ .el-menu {
    height: 100%;
  }
}
</style>
