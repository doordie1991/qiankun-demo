<template>
  <div class="tabnav">
    <slot name="before" />
    <div class="tabnav-tabs">
      <el-tabs type="card" :value="current.path" :closable="true" @tab-click="onTabClick" @tab-remove="onTabRemove">
        <el-tab-pane :name="defaultPage" :closable="false">
          <span slot="label"> <i class="el-icon-s-home" /><label class="em-tabnav-tabs-txt">首页</label> </span>
        </el-tab-pane>
        <el-tab-pane v-for="(item, i) in opened" :key="i" :name="item.path">
          <span slot="label" :index="i">
            <i :class="item.icon" @contextmenu.prevent="showContextMenu" />
            <label class="em-tabnav-tabs-txt" @contextmenu.prevent="showContextMenu"> {{ item.tabName }}</label>
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--控制页签-下拉-->
    <div ref="contextmenu" class="em-tabnav-contextmenu" v-show="contextmenu.visible" :style="{ top: contextmenu.top, left: contextmenu.left }">
      <ul>
        <li @click.stop="onRefresh"><i class="el-icon-refresh" />重新载入</li>
        <li @click.stop="onClose('')"><i class="el-icon-circle-close" />关闭</li>
        <li @click.stop="onClose('Left')"><i class="el-icon-d-arrow-left" />关闭左侧</li>
        <li @click.stop="onClose('Right')"><i class="el-icon-d-arrow-right" />关闭右侧</li>
        <li @click.stop="onClose('Other')"><i class="el-icon-more" />关闭其它</li>
        <li @click.stop="onClose('All')"><i class="el-icon-refresh-right" />关闭全部</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { on, off, hasClass } from '@/utils/dom'
export default {
  name: 'tabnav',
  data() {
    return {
      contextmenu: {
        visible: false,
        top: 0,
        left: 0
      },
      closeParams: { index: 0, router: this.$router }
    }
  },
  computed: {
    ...mapState('app/page', { opened: 'opened', current: 'current', defaultPage: 'default' })
  },
  methods: {
    ...mapActions('app/page', ['close', 'closeLeft', 'closeRight', 'closeOther', 'closeAll']),

    /**
     * @description: 显示页签控制栏
     * @param {*} event
     */
    showContextMenu(event) {
      this.contextmenu = {
        visible: true,
        top: event.y + 'px',
        left: event.x + 'px'
      }
      this.closeParams.index = parseInt(event.target.parentNode.getAttribute('index'))
    },

    /**
     * @description: 隐藏页签控制栏
     * @param {*} e
     */
    hideContextMenu(e) {
      const { target } = e || window.event
      if (this.$refs.contextmenu !== target) this.contextmenu.visible = false
    },

    /**
     * @description 处理关闭标签下拉菜单命令
     * @param {String} cmd 命令
     * @param {String} tagName 选择的标签名称
     */
    handleCommand(cmd) {
      this.closeParams.index = this.opened.findIndex((m) => m.path === this.current.path)
      this.onClose(cmd)
    },

    /**
     * @description: 点击页签
     * @param {*} tab
     */
    onTabClick(tab) {
      if (tab.name === this.defaultPage && this.current.path !== this.defaultPage) {
        this.$router.push(this.defaultPage)
        return
      }
      if (this.current.path === tab.name) return
      const page = this.opened.find((page) => page.path === tab.name)
      if (page) {
        const { path, query } = page
        this.$router.push({ path, query })
      }
    },

    /**
     * @description: 移除页签
     * @param {*} path
     */
    onTabRemove(path) {
      this.closeParams.index = this.opened.findIndex((m) => m.path === path)
      this.onClose()
    },

    /**
     * @description: 关闭页签
     * @param {*} type
     */
    onClose(type) {
      this[`close${type || ''}`](this.closeParams)
    },

    /**
     * @description: 重新载入
     * @param {*}
     */
    onRefresh() {
      const { path, query } = page
      this.$router.push({ path, query })
    }
  },
  watch: {
    'contextmenu.visible'(val) {
      if (val) {
        on(document, 'mouseup', this.hideContextMenu)
      } else {
        off(document, 'mouseup', this.hideContextMenu)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.em-tabnav-contextmenu {
  position: fixed;
  padding: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  z-index: 9999;

  & li:first-child {
    border-bottom: 1px solid #ebeef5;
  }

  li {
    list-style: none;
    line-height: 30px;
    padding: 0 15px;
    margin: 0;
    font-size: 13px;
    color: #606266;
    cursor: pointer;
    outline: none;
  }
}
</style>
