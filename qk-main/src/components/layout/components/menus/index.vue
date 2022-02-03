<template>
  <div class="sidebar-menus">
    <template v-for="item in data">
      <el-submenu v-if="item.children && item.children.length > 0" :key="item.id" :index="item.menuName">
        <template slot="title">
          <span>{{ item.menuName }}</span>
        </template>
        <sidebar-menus :data="item.children"></sidebar-menus>
      </el-submenu>

      <el-menu-item v-else :key="item.id" :index="item.id + ''" @click="onClick(item)">
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import { openMenu } from '@/utils/menu'
export default {
  name: 'sidebar-menus',
  props: {
    data: Array
  },
  methods: {
    onClick(item) {
      openMenu(this.$router, item)
    }
  }
}
</script>
