<template>
  <div class="content">
    <div class="content-top">
      <tabnav />
    </div>
    <div class="content-body">
      <transition name="fade-transverse">
        <div id="child" v-show="isChild"></div>
      </transition>
      <transition name="fade-transverse" v-show="!isChild">
        <keep-alive :include="keepAlive">
          <router-view :key="$route.path" id="main" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import tabnav from '../tabnav'
import { mapState, mapActions } from 'vuex'
export default {
  components: { tabnav },
  data() {
    return {
      aa: false
    }
  },
  computed: {
    ...mapState('app/page', ['keepAlive']),
    isChild() {
      return this.$route.meta && this.$route.meta.isChild
    }
  }
}
</script>

<style lang="scss" scoped>
.content,
#child {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &-top {
    width: 100%;
    height: 40px;
  }

  &-body {
    flex-grow: 1;
  }
}
</style>
