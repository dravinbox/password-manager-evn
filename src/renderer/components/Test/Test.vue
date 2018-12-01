<!--父组件-->
<template>
  <div>
    <h2>父组件</h2>
    <br>
    <Child-one :parentMessage="parentMessage"></Child-one>
  </div>
</template>
<script>
  import ChildOne from '@/components/Test/ChildOne'

  export default{
    components: {
      ChildOne,
    },
    data() {
      return {
        parentMessage: '我是来自父组件的消息sddss',
      };
    },
  };
</script>
<style scoped>
</style>
