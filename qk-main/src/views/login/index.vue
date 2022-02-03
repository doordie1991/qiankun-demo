<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-title">Hello QianKun</div>
      <el-form ref="form" :model="model" :rules="rules" label-position="left">
        <el-form-item prop="userName">
          <el-input v-model="model.userName" placeholder="账号" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="model.password" placeholder="密码" show-password />
        </el-form-item>
      </el-form>

      <el-button class="login-btn" type="primary" @click="onLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
const api = $api.main.auth
export default {
  data() {
    return {
      model: {
        userName: 'admin',
        password: '123'
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async onLogin() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return false
        const result = await api.login(this.model)
        // 初始化令牌
        this.$store.commit('app/token/init', result)
        //下发数据
         $qiankunActions.setGlobalState({ token: result })

        let redirect = this.$route.query.redirect
        if (!redirect || redirect === '') {
          redirect = '/'
        }

        this.$router.push({
          path: redirect
        })
      })
    }
  },
  mounted() {
    const _this = this
    document.onkeydown = function (e) {
      let ev = document.all ? window.event : e
      if (ev.keyCode === 13) {
        _this.onLogin()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(84, 92, 100);

  &-form {
    width: 400px;
    height: 280px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 0 8px #ccc;

    &-title {
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      margin-bottom: 12px;
    }
  }

  &-btn {
    width: 100%;
  }
}
</style>
