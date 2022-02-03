<template>
  <div class="page">
    <h1>主应用-页面1</h1>
  </div>
</template>

<script>
export default {
  created() {
    $qiankunActions.setGlobalState({ userInfo: null })
  }
}
</script>
