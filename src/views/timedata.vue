<template>
  <div>{{ initTime }}</div>
</template>
<script>
export default {
  data() {
    return {
      timeDate: new Date()
    }
  },
  computed: {
    initTime() {
      var time = this.timeDate
      var month = time.getMonth() + 1
      var day = time.getDate()
      var hour = time.getHours()
      var minute = time.getMinutes()
      var second = time.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return (
        time.getFullYear() +
				'/' +
				month +
				'/' +
				day +
				' ' +
				hour +
				':' +
				minute +
				':' +
				second
      )
    }
  },
  mounted() {
    var _this = this
    this.timer = setInterval(() => {
      _this.timeDate = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>
