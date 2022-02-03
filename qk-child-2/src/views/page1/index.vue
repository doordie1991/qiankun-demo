<template>
  <div>
    <h1>子应用2-页面1</h1>
    <ul>
      <li><router-link to="/">返回主应用</router-link></li>
    </ul>

    <h2>从主应用获取到的token数据</h2>
    <pre>
      {{ token }}
    </pre>
  </div>
</template>

<script>
export default {
  computed: {
    token() {
      return JSON.stringify(this.$store.state.token, null, 4)
    }
  }
}
</script>
