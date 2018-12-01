<!--子组件-->
<template>
  <div>
    <h3>我是子组件一</h3>
    <span>{{parentMessage}}</span>
  </div>
</template>
<script>
  export default{
    props: ['parentMessage'],
  };
</script>
<style scoped>
</style>
