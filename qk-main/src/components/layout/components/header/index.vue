<template>
  <div class="header">
    <div class="title">Hello QianKun</div>
    <div class="toolbar">
      <div class="toolbar-item" @click="onLogout">
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('app/system', ['logout']),
    async onLogout() {
      this.$confirm('确认退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.logout()

          // 跳转到登录页面
          this.$router.push({
            name: 'login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
  > .title {
    flex-grow: 1;
    height: 100%;
    line-height: 60px;
    color: #ff9900;
    font-size: 24px;
    padding-left: 12px;
    box-sizing: border-box;
  }

  .toolbar {
    display: flex;
    height: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      i {
        font-size: 30px;
        color: #ff9900;
      }
    }
  }
}
</style>
