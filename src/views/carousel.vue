<template>
  <div class="container">

    <div class="carousel">
      <div class="img1" :style="testA">123</div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      testA: {
        width: '100px',
        height: '100px',
        backgroundImage: 'url(' + require('../assets/images/bgi/1.jpeg') + ')'
      }
    }
  },
  compued: {

  }
}
</script>
<style lang="scss" scoped>
  .carousel{
    width: 1200px;
    height: 180px;
    background-color: red;
  }
</style>>
