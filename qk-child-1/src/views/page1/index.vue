<template>
  <div>
    <h1>子应用1-页面1</h1>
    <ul>
      <li><router-link to="/">返回主应用</router-link></li>
    </ul>

    <h2>从主应用获取到的用户数据</h2>
    <pre>
      {{ userInfo }}
    </pre>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return JSON.stringify(this.$store.state.user, null, 4)
    }
  }
}
</script>
