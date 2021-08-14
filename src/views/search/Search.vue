<template>
  <transition name="search">
    <div>Search</div>
  </transition>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang='scss' scoped>
.search-enter-active,
.search-leave-active {
  transition: all 0.3s;
}
.search-enter,
.search-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}
</style>