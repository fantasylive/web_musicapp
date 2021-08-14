<template>
  <transition name="user">
    <div>User</div>
  </transition>
</template>

<script>
export default {
  name: 'User'
}
</script>

<style lang='scss' scoped>
.user-enter-active,
.user-leave-active {
  transition: all 0.3s;
}
.user-enter,
.user-leave-to {
  transform: translate3d(-50%, 0, 0);
  opacity: 0;
}
</style>